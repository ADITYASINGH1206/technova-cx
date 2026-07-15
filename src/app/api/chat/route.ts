/* ============================================================
   POST /api/chat — Main chat endpoint
   Runs the full Orchestrator → Support → Critic pipeline
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { runPipeline } from "@/lib/agents/pipeline";

export const maxDuration = 60; // Allow up to 60 seconds for the pipeline

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversation_id, customer_id } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Run the full pipeline
    const result = await runPipeline({
      message: message.trim(),
      conversationId: conversation_id,
      customerId: customer_id,
    });

    return NextResponse.json({
      response: result.response,
      citations: result.citations,
      critic_verdict: result.criticVerdict,
      intent: result.intent,
      conversation_id: result.conversationId,
      escalated: result.escalated,
      ticket_id: result.ticketId,
      trace: result.traceLog,
    });
  } catch (error) {
    console.error("[API /chat] Error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong processing your message. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
