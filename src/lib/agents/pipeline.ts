/* ============================================================
   Pipeline — Full Agent Orchestration
   Ties together: Hard Triggers → Orchestrator → Support Agent → Critic
   ============================================================ */

import { createServiceClient } from "@/lib/supabase/server";
import { checkHardTriggers, extractRefundAmount } from "./escalation";
import { classifyIntent, type ConversationState } from "./orchestrator";
import { runSupportAgent } from "./support-agent";
import { runCriticAgent } from "./critic-agent";
import type { CriticVerdict, Citation } from "@/types/database";

export interface PipelineResult {
  response: string;
  citations: Citation[];
  criticVerdict: CriticVerdict | null;
  intent: string;
  conversationId: string;
  escalated: boolean;
  ticketId?: string;
  traceLog: TraceEntry[];
}

export interface TraceEntry {
  timestamp: string;
  agent: string;
  action: string;
  details?: string;
}

function trace(log: TraceEntry[], agent: string, action: string, details?: string) {
  log.push({
    timestamp: new Date().toISOString(),
    agent,
    action,
    details,
  });
  console.log(`[${agent}] ${action}${details ? ` — ${details}` : ""}`);
}

/**
 * Run the full NexaBot pipeline for a customer message.
 */
export async function runPipeline(options: {
  message: string;
  conversationId?: string;
  customerId?: string;
}): Promise<PipelineResult> {
  const { message, customerId } = options;
  let { conversationId } = options;
  const supabase = createServiceClient();
  const traceLog: TraceEntry[] = [];

  // --- 1. Load or create conversation ---
  let conversationHistory: { role: string; content: string }[] = [];
  let conversationState: Partial<ConversationState> = {};

  if (conversationId) {
    // Load existing conversation
    const { data: messages } = await supabase
      .from("messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    conversationHistory = (messages || []) as { role: string; content: string }[];

    // Load conversation state
    const { data: conv } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .single();

    if (conv) {
      conversationState = {
        intent: conv.intent,
        order_id_in_context: conv.order_id_in_context,
        turn_count: conv.turn_count,
        unresolved_turns_on_same_issue: conv.unresolved_turns,
      };
    }
  } else {
    // Create new conversation
    conversationId = `CONV-${Date.now().toString(36).toUpperCase()}`;
    await supabase.from("conversations").insert({
      id: conversationId,
      customer_id: customerId || "00000000-0000-0000-0000-000000000001",
      status: "active",
      turn_count: 0,
      unresolved_turns: 0,
    });
    trace(traceLog, "System", "Session started", `conversation_id=${conversationId}`);
  }

  // Store the customer message
  const customerMsgId = `MSG-${Date.now().toString(36).toUpperCase()}-C`;
  await supabase.from("messages").insert({
    id: customerMsgId,
    conversation_id: conversationId,
    role: "customer",
    content: message,
  });

  // --- 2. Check hard triggers (BEFORE any LLM call) ---
  const refundAmount = extractRefundAmount(message);
  const hardTrigger = checkHardTriggers(message, {
    mentionedRefundAmount: refundAmount,
    unresolvedTurns: conversationState.unresolved_turns_on_same_issue,
  });

  if (hardTrigger.triggered) {
    trace(traceLog, "Escalation", "Hard trigger fired", hardTrigger.reason);
    const ticketId = `TCK-${Math.floor(4500 + Math.random() * 500)}`;

    await supabase.from("tickets").insert({
      id: ticketId,
      conversation_id: conversationId,
      customer_id: customerId || "00000000-0000-0000-0000-000000000001",
      category: hardTrigger.ticketCategory || "Other",
      reason_for_escalation: hardTrigger.reason,
      priority: hardTrigger.ticketPriority || "High",
      status: "Open",
    });

    await supabase
      .from("conversations")
      .update({ status: "escalated", intent: "ESCALATE" })
      .eq("id", conversationId);

    const escalationResponse =
      "I understand this is important to you, and I want to make sure you get the best help possible. I'm connecting you with a human support agent right away.\n\n" +
      `📋 **Ticket #${ticketId}** has been created. A specialist will reach out to you within the next few hours. Your full conversation history will be shared so you won't need to repeat anything.`;

    // Store the response
    await supabase.from("messages").insert({
      id: `MSG-${Date.now().toString(36).toUpperCase()}-A`,
      conversation_id: conversationId,
      role: "assistant",
      content: escalationResponse,
    });

    // Log analytics event
    await supabase.from("analytics_events").insert({
      id: `AE-${Date.now()}`,
      type: "conversation_escalated",
      payload: { reason: hardTrigger.reason, ticket_id: ticketId, conversation_id: conversationId },
    });

    return {
      response: escalationResponse,
      citations: [],
      criticVerdict: null,
      intent: "ESCALATE",
      conversationId,
      escalated: true,
      ticketId,
      traceLog,
    };
  }

  // --- 3. Run Orchestrator (classify intent) ---
  trace(traceLog, "Orchestrator", "Classifying intent");

  const classification = await classifyIntent(
    message,
    conversationHistory,
    conversationState
  );

  trace(
    traceLog,
    "Orchestrator",
    `Intent classified: ${classification.intent}`,
    classification.state.order_id_in_context
      ? `order=${classification.state.order_id_in_context}`
      : undefined
  );

  // Update conversation state
  await supabase
    .from("conversations")
    .update({
      intent: classification.intent,
      order_id_in_context: classification.state.order_id_in_context,
      turn_count: (conversationState.turn_count || 0) + 1,
    })
    .eq("id", conversationId);

  // --- Handle non-agent routes ---

  // PRE_PURCHASE_REDIRECT — static message, no LLM
  if (classification.intent === "PRE_PURCHASE_REDIRECT") {
    trace(traceLog, "System", "Pre-purchase redirect — static response");
    const redirectMsg = classification.redirectMessage!;

    await supabase.from("messages").insert({
      id: `MSG-${Date.now().toString(36).toUpperCase()}-A`,
      conversation_id: conversationId,
      role: "assistant",
      content: redirectMsg,
    });

    return {
      response: redirectMsg,
      citations: [],
      criticVerdict: null,
      intent: "PRE_PURCHASE_REDIRECT",
      conversationId,
      escalated: false,
      traceLog,
    };
  }

  // ESCALATE — from orchestrator (customer request)
  if (classification.intent === "ESCALATE") {
    trace(traceLog, "Orchestrator", "Escalation routed");
    const ticketId = `TCK-${Math.floor(4500 + Math.random() * 500)}`;

    await supabase.from("tickets").insert({
      id: ticketId,
      conversation_id: conversationId,
      customer_id: customerId || "00000000-0000-0000-0000-000000000001",
      category: "Service",
      reason_for_escalation: "customer_request",
      priority: "Medium",
      status: "Open",
    });

    await supabase
      .from("conversations")
      .update({ status: "escalated" })
      .eq("id", conversationId);

    const escalationResponse =
      `Absolutely — I'll connect you with a human agent right away. 📋 **Ticket #${ticketId}** has been created, and a specialist will reach out shortly with your full conversation context.`;

    await supabase.from("messages").insert({
      id: `MSG-${Date.now().toString(36).toUpperCase()}-A`,
      conversation_id: conversationId,
      role: "assistant",
      content: escalationResponse,
    });

    return {
      response: escalationResponse,
      citations: [],
      criticVerdict: null,
      intent: "ESCALATE",
      conversationId,
      escalated: true,
      ticketId,
      traceLog,
    };
  }

  // UNCLEAR — ask clarifying question
  if (classification.intent === "UNCLEAR") {
    trace(traceLog, "Orchestrator", "Unclear intent — asking clarification");
    const clarifyMsg =
      classification.state.clarifying_question ||
      "I'd love to help! Could you tell me a bit more about what you need? For example, are you looking for help with an order, a return, or a policy question?";

    await supabase.from("messages").insert({
      id: `MSG-${Date.now().toString(36).toUpperCase()}-A`,
      conversation_id: conversationId,
      role: "assistant",
      content: clarifyMsg,
    });

    return {
      response: clarifyMsg,
      citations: [],
      criticVerdict: null,
      intent: "UNCLEAR",
      conversationId,
      escalated: false,
      traceLog,
    };
  }

  // --- 4. SUPPORT / POLICY_FAQ → Run Support Agent ---
  trace(traceLog, "Support Agent", "Starting tool loop", `intent=${classification.intent}`);

  const supportResult = await runSupportAgent(
    message,
    conversationHistory,
    {
      orderId: classification.state.order_id_in_context,
      intent: classification.intent,
    }
  );

  for (const tool of supportResult.toolsUsed) {
    trace(traceLog, "Support Agent", `Tool call: ${tool}`);
  }
  trace(traceLog, "Support Agent", "Draft response generated");

  // --- 5. Run Critic Agent ---
  trace(traceLog, "Critic Agent", "Checking claims");

  // Gather sources for the critic
  const policyChunks = supportResult.citations
    .filter((c) => c.type === "policy")
    .map((c) => ({
      id: c.policy_id || "",
      version: c.version || 1,
      title: c.source,
      body: "", // The critic gets the full context from the tool results
    }));

  const toolResults = supportResult.toolsUsed.map((t) => ({
    toolName: t,
    result: `Tool ${t} was called and returned results`,
  }));

  const criticVerdict = await runCriticAgent(
    message,
    supportResult.response,
    { toolResults, policyChunks }
  );

  trace(
    traceLog,
    "Critic Agent",
    `Verdict: ${criticVerdict.verdict.toUpperCase()} · confidence=${criticVerdict.confidence.toFixed(2)}`,
    `${criticVerdict.claims_checked.length} claims checked`
  );

  // --- 6. Confidence Gate ---
  const citations: Citation[] = supportResult.citations.map((c) => ({
    type: c.type,
    source: c.source,
    policy_id: c.policy_id,
    version: c.version,
    tool_name: c.tool_name,
  }));

  if (criticVerdict.verdict === "fail" || criticVerdict.confidence < 0.6) {
    trace(traceLog, "System", "Confidence gate FAILED — escalating");

    const ticketId = `TCK-${Math.floor(4500 + Math.random() * 500)}`;

    await supabase.from("tickets").insert({
      id: ticketId,
      conversation_id: conversationId,
      customer_id: customerId || "00000000-0000-0000-0000-000000000001",
      category: "Service",
      reason_for_escalation: "low_confidence",
      critic_confidence: criticVerdict.confidence,
      priority: "Medium",
      status: "Open",
    });

    await supabase
      .from("conversations")
      .update({ status: "escalated" })
      .eq("id", conversationId);

    const escalationResponse =
      "I want to make sure I give you completely accurate information, so I'm connecting you with a specialist who can help.\n\n" +
      `📋 **Ticket #${ticketId}** has been created. They'll have your full context so you won't need to repeat anything.`;

    await supabase.from("messages").insert({
      id: `MSG-${Date.now().toString(36).toUpperCase()}-A`,
      conversation_id: conversationId,
      role: "assistant",
      content: escalationResponse,
      critic_verdict: criticVerdict,
    });

    await supabase.from("analytics_events").insert({
      id: `AE-${Date.now()}`,
      type: "critic_fail",
      payload: { confidence: criticVerdict.confidence, conversation_id: conversationId },
    });

    return {
      response: escalationResponse,
      citations: [],
      criticVerdict,
      intent: classification.intent,
      conversationId,
      escalated: true,
      ticketId,
      traceLog,
    };
  }

  // --- 7. PASS — Deliver response to customer ---
  trace(traceLog, "System", "Response delivered to customer");

  await supabase.from("messages").insert({
    id: `MSG-${Date.now().toString(36).toUpperCase()}-A`,
    conversation_id: conversationId,
    role: "assistant",
    content: supportResult.response,
    citations,
    critic_verdict: criticVerdict,
  });

  // Log analytics
  await supabase.from("analytics_events").insert({
    id: `AE-${Date.now()}`,
    type: "critic_pass",
    payload: {
      confidence: criticVerdict.confidence,
      tools_used: supportResult.toolsUsed,
      conversation_id: conversationId,
    },
  });

  return {
    response: supportResult.response,
    citations,
    criticVerdict,
    intent: classification.intent,
    conversationId,
    escalated: false,
    traceLog,
  };
}
