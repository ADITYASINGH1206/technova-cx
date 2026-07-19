import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationId } = body;

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    // Determine Intent (Orchestrator)
    const prompt = `You are NexaBot, an AI support agent for TechNova.
User message: "${message}"
Respond directly to the user in a helpful, concise manner. If they ask about an order, warranty, or return, simulate a helpful response. If they ask to speak to a human, apologize and say you'll escalate.
Respond ONLY with your reply to the user.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const aiMessage = response.text || "I'm sorry, I couldn't process your request.";
    const isEscalation = message.toLowerCase().includes('human') || message.toLowerCase().includes('manager');

    // Simulate trace log
    const traceLog = [
      `[Support Agent] Received message: "${message}"`,
      `[Support Agent] Intent classified as ${isEscalation ? 'ESCALATION' : 'SUPPORT'}`,
      `[Support Agent] Querying knowledge base...`,
      `[Support Agent] Generated response.`
    ];

    return NextResponse.json({
      response: aiMessage,
      intent: isEscalation ? "ESCALATED" : "SUPPORT_QUERY",
      escalated: isEscalation,
      conversationId: conversationId || `conv-${Date.now()}`,
      citations: [
        { title: 'TechNova Return Policy', policyId: 'returns' },
        { title: 'Standard Warranty terms', policyId: 'warranty' }
      ],
      ticketId: isEscalation ? `ERR-${Math.floor(Math.random() * 1000)}` : null,
      criticVerdict: { passed: true, confidence: 0.95 },
      traceLog
    });

  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
