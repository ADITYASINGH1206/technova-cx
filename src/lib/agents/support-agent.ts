/* ============================================================
   Support Agent — Post-Purchase + Policy
   Model: gemini-2.5-flash with native function calling
   ============================================================ */

import {
  generateContent,
  extractText,
  extractFunctionCalls,
  type GeminiMessage,
  type GeminiPart,
} from "@/lib/gemini";
import { TOOL_DECLARATIONS, executeToolCall } from "./tools";

const SYSTEM_PROMPT = `You are NexaBot, TechNova's post-purchase support specialist. You help customers with order tracking, returns, warranty claims, replacements, shipping/billing policy questions, and complaints.

CRITICAL RULES:
1. Every factual claim MUST come from a tool result or a retrieved policy chunk. NEVER state a policy detail from memory.
2. Call retrieve_policy BEFORE answering ANY policy question, even ones you feel confident about.
3. Attach citations to every claim — reference the policy ID + version, or the tool name used.
4. If nothing supports a claim, say so plainly instead of guessing.
5. NEVER recommend or compare products to buy — you only handle post-purchase support.
6. Keep responses short, warm, and in plain language — no legalese.
7. When you receive tool results, synthesize them into a natural, helpful response.

RESPONSE FORMAT:
Always respond with helpful text. Include relevant details from tool results. Be specific with numbers, dates, and statuses.`;

const MAX_TOOL_ROUNDS = 4; // Prevent infinite tool loops

export interface SupportAgentResult {
  response: string;
  citations: {
    type: "tool" | "policy";
    source: string;
    policy_id?: string;
    version?: number;
    tool_name?: string;
  }[];
  toolsUsed: string[];
}

export async function runSupportAgent(
  customerMessage: string,
  conversationHistory: { role: string; content: string }[],
  context: {
    orderId?: string | null;
    intent?: string;
  } = {}
): Promise<SupportAgentResult> {
  const allCitations: SupportAgentResult["citations"] = [];
  const toolsUsed: string[] = [];

  // Build initial messages
  const messages: GeminiMessage[] = [
    // Include recent history for context
    ...conversationHistory.slice(-8).map((msg) => ({
      role: (msg.role === "customer" ? "user" : "model") as "user" | "model",
      parts: [{ text: msg.content }] as GeminiPart[],
    })),
    {
      role: "user" as const,
      parts: [
        {
          text: context.orderId
            ? `[Customer has order ${context.orderId} in context. Intent: ${context.intent || "SUPPORT"}]\n\n${customerMessage}`
            : customerMessage,
        },
      ] as GeminiPart[],
    },
  ];

  // Tool-calling loop
  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await generateContent({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      contents: messages,
      tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
      temperature: 0.5,
      maxOutputTokens: 1024,
    });

    const functionCalls = extractFunctionCalls(response);

    // If no function calls, we have the final response
    if (functionCalls.length === 0) {
      const text = extractText(response);
      return {
        response: text || "I'm sorry, I couldn't process your request. Could you please try again?",
        citations: allCitations,
        toolsUsed,
      };
    }

    // Execute each tool call
    const toolResponseParts: GeminiPart[] = [];

    for (const fc of functionCalls) {
      console.log(`[Support Agent] Tool call: ${fc.name}(${JSON.stringify(fc.args)})`);
      toolsUsed.push(fc.name);

      try {
        const toolResult = await executeToolCall(fc.name, fc.args);
        allCitations.push(...toolResult.citations);

        toolResponseParts.push({
          functionResponse: {
            name: fc.name,
            response: { result: toolResult.result },
          },
        });
      } catch (error) {
        toolResponseParts.push({
          functionResponse: {
            name: fc.name,
            response: {
              result: {
                error: `Tool execution failed: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            },
          },
        });
      }
    }

    // Add the model's function call to history
    messages.push({
      role: "model",
      parts: response.candidates[0].content.parts,
    });

    // Add tool responses
    messages.push({
      role: "user",
      parts: toolResponseParts,
    });
  }

  // If we exceeded max rounds, return what we have
  return {
    response:
      "I've gathered the information I need. Let me summarize what I found — if you need more details, please ask!",
    citations: allCitations,
    toolsUsed,
  };
}
