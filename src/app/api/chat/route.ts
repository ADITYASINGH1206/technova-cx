import { NextResponse } from 'next/server';
import { runPipeline } from '@/lib/agents/pipeline';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationId } = body;

    // Validate incoming user payload
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string.' },
        { status: 400 }
      );
    }

    // Execute the full Orchestrator -> Support -> Critic pipeline
    const result = await runPipeline({
      message,
      conversationId,
    });

    // Return the complete structured payload required for the UI trust story
    return NextResponse.json({
      response: result.response,
      citations: result.citations || [],
      criticVerdict: result.criticVerdict || null,
      intent: result.intent,
      conversationId: result.conversationId,
      escalated: result.escalated || false,
      ticketId: result.ticketId || null,
      traceLog: result.traceLog || [],
    });
  } catch (error: unknown) {
    console.error('Pipeline execution failure:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat request through the AI pipeline.',
        details: error instanceof Error ? error.message : 'Unknown internal error',
      },
      { status: 500 }
    );
  }
}
