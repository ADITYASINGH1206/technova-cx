"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export default function SupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hi Sarah! I'm NexaBot, your TechNova assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.text || "I'm sorry, I encountered an error processing your request.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "NexaBot systems are currently offline or unreachable. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto h-[80vh] min-h-[600px] flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)] mb-8 text-center">NexaBot Support Hub</h1>
      
      <GlassCard className="flex-1 flex flex-col overflow-hidden p-0">
        <div className="p-4 border-b border-[var(--color-sf-border)] bg-white/40 flex items-center gap-4">
          <div className="w-10 h-10 bg-[var(--color-sf-primary)] rounded-full flex items-center justify-center text-white text-xl shrink-0">
            🤖
          </div>
          <div>
            <h2 className="font-bold">NexaBot</h2>
            <p className="text-xs opacity-60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Online & Ready
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'bot' ? (
                <div className="w-8 h-8 bg-[var(--color-sf-primary)] rounded-full shrink-0 flex items-center justify-center text-white text-sm">
                  🤖
                </div>
              ) : (
                <div className="w-8 h-8 bg-[var(--color-sf-foreground)] rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs">
                  SC
                </div>
              )}
              
              <div className={`
                p-4 max-w-[80%] shadow-sm text-sm
                ${msg.role === 'user' 
                  ? 'bg-[var(--color-sf-primary)] text-white rounded-2xl rounded-tr-sm shadow-[var(--color-sf-primary)]/20' 
                  : 'bg-white/60 border border-[var(--color-sf-border)] rounded-2xl rounded-tl-sm'
                }
              `}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[var(--color-sf-primary)] rounded-full shrink-0 flex items-center justify-center text-white text-sm">
                🤖
              </div>
              <div className="bg-white/60 border border-[var(--color-sf-border)] rounded-2xl rounded-tl-sm p-4 max-w-[80%] shadow-sm text-sm flex items-center gap-2">
                <span className="animate-pulse w-2 h-2 bg-[var(--color-sf-primary)] rounded-full"></span>
                <span className="animate-pulse w-2 h-2 bg-[var(--color-sf-primary)] rounded-full animation-delay-200"></span>
                <span className="animate-pulse w-2 h-2 bg-[var(--color-sf-primary)] rounded-full animation-delay-400"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white/40 border-t border-[var(--color-sf-border)]">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..." 
              className="flex-1 bg-white/60 border border-[var(--color-sf-border)] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-[var(--color-sf-primary)] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 shrink-0"
            >
              ↑
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
