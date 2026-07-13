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
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "customer" | "assistant" | "system";
  content: string;
  timestamp: Date;
  citations?: { label: string; href: string }[];
  confidence?: number;
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

    // Simulate AI response (will be replaced with Supabase Edge Function call)
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          "I'd be happy to help with that! However, the AI engine isn't connected yet — this is the foundation build. Once the Supabase Edge Function and Gemini API are wired up, I'll be able to look up your orders, check warranty status, and answer policy questions with full citations.\n\nFor now, this chat UI is ready and waiting for the AI pipeline! 🚀",
        timestamp: new Date(),
        citations: [
          { label: "Demo Mode — AI engine coming in Phase 2", href: "#" },
        ],
        confidence: 0.95,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-4 mb-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-text-primary text-sm flex items-center gap-2">
                NexaBot
                <span className="px-2 py-0.5 rounded-full bg-success-500/10 text-success-600 text-xs font-medium">
                  Online
                </span>
              </h1>
              <p className="text-xs text-text-tertiary">
                Trust-first AI support · Every answer fact-checked
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-medium">
              <Shield className="w-3 h-3" />
              Grounded AI
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="glass-strong rounded-2xl overflow-hidden" style={{ height: "calc(100vh - 280px)" }}>
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        msg.role === "customer" ? "" : "flex gap-3"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div>
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.role === "customer"
                              ? "bg-brand-500 text-white rounded-tr-sm"
                              : "bg-surface-tertiary text-text-primary rounded-tl-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>

                        {/* Citations */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {msg.citations.map((cite, i) => (
                              <a
                                key={i}
                                href={cite.href}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-medium hover:bg-brand-100 transition-colors"
                              >
                                <Shield className="w-3 h-3" />
                                {cite.label}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Confidence Badge */}
                        {msg.confidence !== undefined && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-success-500/10 text-success-600 text-xs font-medium">
                              <Sparkles className="w-3 h-3" />
                              Verified · Confidence: {msg.confidence.toFixed(2)}
                            </div>
                          </div>
                        )}

                        {/* Feedback */}
                        {msg.role === "assistant" && msg.id !== "welcome" && (
                          <div className="mt-2 flex items-center gap-1">
                            <button className="p-1.5 rounded-lg text-text-tertiary hover:text-success-500 hover:bg-success-50 transition-all">
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg text-text-tertiary hover:text-danger-500 hover:bg-danger-50 transition-all">
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Timestamp */}
                        <p className="mt-1 text-xs text-text-tertiary">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-surface-tertiary">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-6 pb-2">
                <p className="text-xs text-text-tertiary mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => handleSend(qr)}
                      className="px-3 py-1.5 rounded-xl border border-border-default text-xs text-text-secondary hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border-subtle">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about orders, returns, warranty..."
                  className="flex-1 px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-text-primary transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-3 rounded-xl gradient-brand text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
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
    </div>
  );
}
