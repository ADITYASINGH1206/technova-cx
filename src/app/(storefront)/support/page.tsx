'use client';

import React, { useState, useRef, useEffect } from 'react';

// --- Type Definitions ---
interface Citation {
  id?: string;
  policyId?: string;
  title: string;
  snippet?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  citations?: Citation[];
  intent?: string;
  escalated?: boolean;
  ticketId?: string;
  traceLog?: string[];
  criticVerdict?: any;
}

export default function SupportChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I'm NexaBot, your AI support assistant. How can I help you with your orders, warranties, or returns today?",
      intent: 'SUPPORT_GREETING'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [currentIntent, setCurrentIntent] = useState<string>('Support Ready');
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, expandedTraceId]);

  const handleSend = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const textToSend = customInput || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          conversationId: conversationId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      // Update persistent conversation ID and header intent badge
      if (data.conversationId) setConversationId(data.conversationId);
      if (data.intent) setCurrentIntent(data.intent);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.response || "I'm sorry, I couldn't process that request.",
        citations: data.citations || [],
        intent: data.intent,
        escalated: data.escalated || false,
        ticketId: data.ticketId,
        traceLog: data.traceLog,
        criticVerdict: data.criticVerdict,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "I'm having trouble connecting to our support pipeline right now. Please try again in a moment.",
          escalated: true,
          ticketId: 'ERR-500'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper for intent badge styling
  const getIntentBadgeColor = (intent: string) => {
    if (intent.includes('ESCALAT') || intent.includes('COMPLAINT')) return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (intent.includes('POLICY') || intent.includes('FAQ')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  };

  const quickReplies = [
    "Where is order ORD-7734?",
    "Can I return my AeroPhone Pro?",
    "Is my NovaBook Pro X15 under warranty?",
    "I want to speak to a human manager immediately."
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto p-4 md:p-6">
      {/* Chat Header with Intent Badge */}
      <div className="flex items-center justify-between p-4 mb-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h1 className="font-semibold text-white">NexaBot AI Support</h1>
            <p className="text-xs text-slate-400">Powered by Orchestrator & Critic Pipeline</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getIntentBadgeColor(currentIntent)}`}>
          {currentIntent.replace(/_/g, ' ')}
        </div>
      </div>

      {/* Message Window */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Bubble */}
            <div
              className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{msg.text}</p>

              {/* Citation Chips */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-slate-400 self-center mr-1">Grounded in:</span>
                  {msg.citations.map((cite, idx) => (
                    <a
                      key={idx}
                      href={`/policies#${cite.policyId || 'general'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-blue-400 hover:bg-slate-700 hover:text-blue-300 transition-colors border border-slate-700"
                    >
                      🛡️ {cite.title}
                    </a>
                  ))}
                </div>
              )}

              {/* AI Trace Drawer Toggle */}
              {msg.sender === 'bot' && msg.intent !== 'SUPPORT_GREETING' && (
                <div className="mt-3 pt-2 border-t border-slate-800/50">
                  <button 
                    onClick={() => setExpandedTraceId(expandedTraceId === msg.id ? null : msg.id)}
                    className="flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <span>⚡ View AI Trace</span>
                    <span className="transform transition-transform" style={{ transform: expandedTraceId === msg.id ? 'rotate(180deg)' : 'none' }}>▼</span>
                  </button>
                  
                  {/* Expanded Drawer */}
                  {expandedTraceId === msg.id && (
                    <div className="mt-3 p-3 bg-black/60 rounded-lg border border-slate-700 font-mono text-[10px] sm:text-xs overflow-hidden">
                      <div className="mb-2">
                        <span className="text-purple-400 font-bold">▶ ORCHESTRATOR</span>
                        <div className="pl-3 mt-1 text-slate-300">
                          Classified Intent: <span className="text-white bg-purple-500/20 px-1 rounded">{msg.intent || 'UNKNOWN'}</span>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-blue-400 font-bold">▶ SUPPORT AGENT</span>
                        <div className="pl-3 mt-1 text-slate-300 space-y-1">
                          {msg.traceLog ? (
                            msg.traceLog.filter((log) => log.includes('Support Agent')).map((log, idx) => (
                              <div key={idx} className="break-all">{log.replace(/\[\d{2}:\d{2}:\d{2}\.\d{3}\] \[Support Agent\] /, '')}</div>
                            ))
                          ) : (
                            <div>Generated response with standard toolkit</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-emerald-400 font-bold">▶ CRITIC AGENT</span>
                        <div className="pl-3 mt-1 text-slate-300">
                          {msg.criticVerdict ? (
                            <>
                              <div>Verification Verdict: <span className={msg.criticVerdict.verdict === 'pass' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{msg.criticVerdict.verdict.toUpperCase()}</span></div>
                              <div>Confidence Score: {(msg.criticVerdict.confidence * 100).toFixed(0)}%</div>
                              {msg.criticVerdict.claims_checked?.length > 0 && (
                                <div className="mt-1 text-slate-500">{msg.criticVerdict.claims_checked.length} facts verified against KB</div>
                              )}
                            </>
                          ) : (
                            <span className="text-slate-500">No critic evaluation required</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Escalation Floating Card */}
            {msg.escalated && (
              <div className="mt-2 w-full max-w-[85%] md:max-w-[75%] p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-amber-200 animate-fade-in">
                <span className="text-xl">⚠️</span>
                <div className="text-xs">
                  <p className="font-semibold text-amber-300">Escalated to Human Agent</p>
                  <p className="mt-0.5 text-amber-200/80">
                    {msg.ticketId 
                      ? `Ticket #${msg.ticketId} has been created. A priority customer success manager is reviewing your trace history.`
                      : 'Our Critic AI flagged this request for manual review. An agent will connect shortly.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center space-x-2 text-slate-400 text-sm p-4 bg-slate-900/50 rounded-2xl w-fit border border-slate-800/50">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
            </div>
            <span>Orchestrator analyzing & Critic verifying...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies (Only show when starting) */}
      {messages.length === 1 && !loading && (
        <div className="flex overflow-x-auto gap-2 pb-3 mb-2 scrollbar-hide">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSend(undefined, reply)}
              className="whitespace-nowrap px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-full border border-slate-700 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={(e) => handleSend(e)} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about an order (e.g., ORD-7734), warranty, or return policy..."
          disabled={loading}
          className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          Send
        </button>
      </form>
    </div>
  );
}
