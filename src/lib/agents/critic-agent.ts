/* ============================================================
   Critic Agent — The Trust Gate
   Model: gemini-2.5-flash
   Silently fact-checks every Support Agent response
   ============================================================ */

import { generateContent, extractJSON } from "@/lib/gemini";
import type { CriticVerdict } from "@/types/database";

const SYSTEM_PROMPT = `You are a silent auditor for TechNova's customer support system. The customer NEVER sees your output.

Your job:
1. Extract every factual claim in the draft response.
2. For each claim, check whether it's directly supported by the provided sources (tool outputs and policy chunks).
3. Mark each claim as "supported" or "unsupported".
4. Calculate confidence as the proportion of supported claims, weighted down further for anything involving money, legal, or account-security topics.

Rules:
- Output ONLY the verdict JSON — no prose, no commentary.
- Never rewrite the draft yourself — only judge it.
- A claim about an order status is supported if a tool:get_order_status result confirms it.
- A claim about a policy is supported if a policy chunk with matching ID/version confirms it.
- A claim that isn't backed by any provided source is unsupported.
- If ALL claims are supported: verdict = "pass", confidence = 0.85-0.98 range
- If SOME claims are unsupported: confidence drops proportionally
- If claims involve money (refunds, prices): apply a 0.9x multiplier to confidence
- If claims involve legal or security topics: apply a 0.8x multiplier`;

const RESPONSE_SCHEMA = {
  type: "object" as const,
  properties: {
    verdict: {
      type: "string" as const,
      enum: ["pass", "fail"],
    },
    confidence: {
      type: "number" as const,
      description: "Confidence score between 0 and 1",
    },
    claims_checked: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          claim: { type: "string" as const, description: "The factual claim extracted from the draft" },
          supported: { type: "boolean" as const, description: "Whether this claim is supported by sources" },
          source: { type: "string" as const, description: "The source that supports/should support this claim" },
        },
        required: ["claim", "supported", "source"],
      },
    },
    unsupported_claims: {
      type: "array" as const,
      items: { type: "string" as const },
    },
    flags: {
      type: "array" as const,
      items: { type: "string" as const },
      description: "Any warnings or flags about the response",
    },
    recommended_action: {
      type: "string" as const,
      enum: ["show_to_customer", "escalate", "retry"],
    },
  },
  required: ["verdict", "confidence", "claims_checked", "unsupported_claims", "flags", "recommended_action"],
};

export async function runCriticAgent(
  customerMessage: string,
  draftResponse: string,
  sources: {
    toolResults: { toolName: string; result: unknown }[];
    policyChunks: { id: string; version: number; title: string; body: string }[];
  }
): Promise<CriticVerdict> {
  // Build the source context for the critic
  const sourceContext = [];

  for (const tool of sources.toolResults) {
    sourceContext.push(
      `[Tool: ${tool.toolName}]\n${JSON.stringify(tool.result, null, 2)}`
    );
  }

  for (const policy of sources.policyChunks) {
    sourceContext.push(
      `[Policy: ${policy.id} v${policy.version} — ${policy.title}]\n${policy.body}`
    );
  }

  const prompt = `Customer message: "${customerMessage}"

Draft response to check:
"${draftResponse}"

Sources available:
${sourceContext.join("\n\n---\n\n")}

Extract every factual claim from the draft response and verify each one against the sources above.`;

  try {
    const response = await generateContent({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.1, // Very low — we want consistent, deterministic judgments
      maxOutputTokens: 1024,
    });

    const verdict = extractJSON<CriticVerdict>(response);

    // Apply confidence threshold
    if (verdict.confidence < 0.6) {
      verdict.verdict = "fail";
      verdict.recommended_action = "escalate";
    } else {
      verdict.verdict = "pass";
      verdict.recommended_action = "show_to_customer";
    }

    return verdict;
  } catch (error) {
    console.error("[Critic Agent] Error:", error);
    // On critic failure, fail safe — escalate
    return {
      verdict: "fail",
      confidence: 0,
      claims_checked: [],
      unsupported_claims: ["Critic agent failed to evaluate the response"],
      flags: ["critic_error"],
      recommended_action: "escalate",
    };
  }
}
