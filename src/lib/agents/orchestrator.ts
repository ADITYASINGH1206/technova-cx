/* ============================================================
   Orchestrator Agent — The Traffic Controller
   Model: gemini-2.5-flash-lite
   5-way classification on every incoming message
   ============================================================ */

import { generateContent, extractJSON } from "@/lib/gemini";

export type OrchestratorIntent =
  | "SUPPORT"
  | "POLICY_FAQ"
  | "PRE_PURCHASE_REDIRECT"
  | "ESCALATE"
  | "UNCLEAR";

export interface ConversationState {
  conversation_id: string;
  customer_id: string | null;
  intent: OrchestratorIntent;
  order_id_in_context: string | null;
  product_category: string | null;
  refund_amount: number | null;
  turn_count: number;
  unresolved_turns_on_same_issue: number;
  status: "active" | "resolved" | "escalated";
  clarifying_question?: string;
}

const SYSTEM_PROMPT = `You are TechNova's routing layer. You never talk to the customer directly except to ask one clarifying question or deliver a redirect/escalation message.

Classify the customer's message into exactly one of these intents:
- SUPPORT: Order tracking, returns, refunds, warranty claims, replacements, complaints, delivery issues
- POLICY_FAQ: Questions about policies (return window, shipping times, payment methods, warranty coverage, etc.)
- PRE_PURCHASE_REDIRECT: Product recommendations, comparisons, "which should I buy", feature questions about products not yet purchased
- ESCALATE: Explicit request to talk to a human, angry/threatening language
- UNCLEAR: Ambiguous first message that needs clarification

Extract structured entities when present:
- order_id: Pattern like ORD-XXXX
- product_category: Laptops, Phones, Headphones, or Smartwatches
- refund_amount: Any mentioned amount in rupees

Rules:
- If the customer mentions an order ID or references a past purchase → likely SUPPORT
- If they ask "what is your policy on..." or "do you offer..." → POLICY_FAQ
- If they ask about buying, choosing, or comparing products → PRE_PURCHASE_REDIRECT
- If UNCLEAR, provide a brief clarifying question in the clarifying_question field
- Update conversation state every turn; never re-ask for information already given
- Output strictly the JSON — no prose outside it`;

const RESPONSE_SCHEMA = {
  type: "object" as const,
  properties: {
    intent: {
      type: "string" as const,
      enum: ["SUPPORT", "POLICY_FAQ", "PRE_PURCHASE_REDIRECT", "ESCALATE", "UNCLEAR"],
    },
    order_id_in_context: {
      type: "string" as const,
      description: "Extracted order ID if mentioned (e.g., ORD-7734)",
    },
    product_category: {
      type: "string" as const,
      description: "Extracted product category if mentioned",
    },
    refund_amount: {
      type: "number" as const,
      description: "Mentioned refund amount in rupees",
    },
    clarifying_question: {
      type: "string" as const,
      description: "Question to ask customer if intent is UNCLEAR",
    },
  },
  required: ["intent"],
};

const PRE_PURCHASE_REDIRECT_MESSAGE =
  "Great question! I'm your post-purchase care assistant, so I can't recommend products directly — but the full catalog with filters is right here: **[Browse Shop →](/shop)**. Once you've ordered, I'm here for tracking, returns, warranty, and anything else you need. 🛒";

export async function classifyIntent(
  message: string,
  conversationHistory: { role: string; content: string }[],
  currentState?: Partial<ConversationState>
): Promise<{
  intent: OrchestratorIntent;
  state: Partial<ConversationState>;
  redirectMessage?: string;
}> {
  // Build context for the orchestrator
  const contextParts = [];
  if (currentState?.order_id_in_context) {
    contextParts.push(`Order in context: ${currentState.order_id_in_context}`);
  }
  if (currentState?.turn_count) {
    contextParts.push(`Turn count: ${currentState.turn_count}`);
  }

  const contents = [
    // Include conversation history for context
    ...conversationHistory.slice(-6).map((msg) => ({
      role: msg.role === "customer" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.content }],
    })),
    {
      role: "user" as const,
      parts: [
        {
          text: contextParts.length > 0
            ? `[Context: ${contextParts.join(", ")}]\n\nCustomer message: ${message}`
            : `Customer message: ${message}`,
        },
      ],
    },
  ];

  const response = await generateContent({
    model: "gemini-2.5-flash-lite",
    systemInstruction: SYSTEM_PROMPT,
    contents,
    responseSchema: RESPONSE_SCHEMA,
    temperature: 0.1, // Low temperature for consistent classification
    maxOutputTokens: 256,
  });

  const result = extractJSON<{
    intent: OrchestratorIntent;
    order_id_in_context?: string;
    product_category?: string;
    refund_amount?: number;
    clarifying_question?: string;
  }>(response);

  const newState: Partial<ConversationState> = {
    intent: result.intent,
    order_id_in_context:
      result.order_id_in_context || currentState?.order_id_in_context || null,
    product_category:
      result.product_category || currentState?.product_category || null,
    refund_amount: result.refund_amount || currentState?.refund_amount || null,
    clarifying_question: result.clarifying_question,
  };

  // Handle PRE_PURCHASE_REDIRECT with static message (no LLM call)
  if (result.intent === "PRE_PURCHASE_REDIRECT") {
    return {
      intent: result.intent,
      state: newState,
      redirectMessage: PRE_PURCHASE_REDIRECT_MESSAGE,
    };
  }

  return {
    intent: result.intent,
    state: newState,
  };
}
