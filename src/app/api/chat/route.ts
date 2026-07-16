import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Extract the latest user message
    const latestMessage = messages[messages.length - 1].content;

    // Build history for context (optional, formatting depends on GenAI SDK)
    const formattedHistory = messages.map((m: any) => `${m.role === 'user' ? 'User' : 'NexaBot'}: ${m.content}`).join('\n');

    const prompt = `You are NexaBot, a helpful, futuristic customer support AI for TechNova, a premium electronics company (selling AeroPhone Pro, NovaBook X15, etc.). Keep your answers concise, helpful, and extremely professional. Use the following conversation history for context:
    
    ${formattedHistory}
    
    NexaBot:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({
      text: response.text,
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
