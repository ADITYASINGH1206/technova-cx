"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Shield,
  Sparkles,
  ArrowDown,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Loader2,
  Ticket,
  AlertTriangle,
  Tag
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "customer" | "assistant" | "system";
  content: string;
  timestamp: Date;
  citations?: { label: string; href: string }[];
  confidence?: number;
  intent?: string;
  ticketId?: string;
  isTyping?: boolean;
}

const quickReplies = [
  "Where's my order?",
  "I want a refund",
  "Check my warranty",
  "What's your return policy?",
  "Talk to a human",
];

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hey there! 👋 I'm NexaBot, your TechNova support assistant. I can help you with order tracking, returns, warranty claims, replacements, and policy questions.\n\nEvery answer I give is backed by a real data lookup or policy citation — and silently fact-checked before you see it. How can I help?",
    timestamp: new Date(),
  },
];

export default function SupportPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [conversationId, setConversationId] = useState<string | null>(null);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "customer",
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          conversation_id: conversationId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process message");
      }

      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        citations: data.citations?.map((c: any) => ({
          label: c.type === "policy" ? `Policy: ${c.policy_id}` : `Tool: ${c.tool_name}`,
          href: c.type === "policy" ? `/policies#${c.policy_id}` : "#",
        })),
        confidence: data.critic_verdict?.confidence,
        intent: data.intent,
        ticketId: data.ticket_id,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}-error`,
        role: "assistant",
        content: "I'm having trouble connecting to my system right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative background blobs for light mode glassmorphism */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="max-w-4xl mx-auto px-4 py-6 relative z-10 h-screen flex flex-col">
        {/* Header - Floating Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-4 mb-6 flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
                NexaBot Hub
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                  Online
                </span>
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Trust-first AI support · Every answer fact-checked
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-sm">
              <Shield className="w-3.5 h-3.5 text-brand-300" />
              Grounded AI Engine
            </div>
          </div>
        </motion.div>

        {/* Chat Area - Glass Container */}
        <div className="flex-1 bg-white/60 backdrop-blur-lg border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`flex ${msg.role === "customer" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      msg.role === "customer" ? "" : "flex gap-4"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-brand-500/20">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      {/* Intent Badge for Assistant Messages */}
                      {msg.role === "assistant" && msg.intent && (
                        <div className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 text-[11px] font-bold tracking-wide uppercase">
                          <Tag className="w-3 h-3" />
                          Intent: {msg.intent}
                        </div>
                      )}

                      {/* Main Message Bubble */}
                      <div
                        className={`px-5 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                          msg.role === "customer"
                            ? "bg-slate-900 text-white rounded-tr-sm"
                            : "bg-white/80 backdrop-blur-md border border-white text-slate-800 rounded-tl-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>

                      {/* Citations */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {msg.citations.map((cite, i) => (
                            <a
                              key={i}
                              href={cite.href}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50/80 backdrop-blur border border-brand-100 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors shadow-sm"
                            >
                              <Shield className="w-3 h-3" />
                              {cite.label}
                              <ExternalLink className="w-3 h-3 opacity-50" />
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Confidence Badge */}
                      {msg.confidence !== undefined && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50/80 backdrop-blur border border-emerald-100 text-emerald-700 text-xs font-semibold shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            Verified · Confidence {Math.round(msg.confidence * 100)}%
                          </div>
                        </div>
                      )}

                      {/* Escalation Floating Card */}
                      {msg.ticketId && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mt-3 bg-amber-50/90 backdrop-blur-xl border border-amber-200/60 shadow-[0_8px_30px_rgb(251,191,36,0.15)] rounded-2xl p-4 flex gap-4 items-start"
                        >
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="text-amber-900 font-bold text-sm mb-1 flex items-center gap-2">
                              Escalation Triggered
                              <span className="px-2 py-0.5 bg-amber-200/50 rounded text-amber-800 text-[10px] tracking-wider uppercase">Priority</span>
                            </h4>
                            <p className="text-amber-800 text-xs leading-relaxed mb-3">
                              This conversation has been securely routed to our human support team for immediate review.
                            </p>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/80 text-amber-900 text-xs font-bold font-mono">
                              <Ticket className="w-3.5 h-3.5" />
                              {msg.ticketId}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Feedback & Timestamp */}
                      <div className={`flex items-center gap-3 mt-1 ${msg.role === "customer" ? "justify-end" : "justify-start"}`}>
                        <span className="text-[11px] font-medium text-slate-400">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {msg.role === "assistant" && msg.id !== "welcome" && (
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-full text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all">
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-md shadow-brand-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="px-5 py-4 rounded-3xl rounded-tl-sm bg-white/80 backdrop-blur-md border border-white shadow-sm flex items-center h-[52px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4 pt-2">
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Suggested Questions</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="px-4 py-2 rounded-xl bg-white/50 backdrop-blur border border-white/60 text-sm font-medium text-slate-600 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 hover:shadow-sm transition-all"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white/40 backdrop-blur-xl border-t border-white/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-3 relative"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about orders, returns, warranty..."
                className="flex-1 px-5 py-4 rounded-2xl bg-white/80 backdrop-blur border border-white/60 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none text-[15px] text-slate-900 placeholder:text-slate-400 transition-all shadow-inner shadow-slate-100/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-4 rounded-2xl bg-slate-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
