"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface Ticket {
  id: string;
  customer: string;
  time: string;
  title: string;
  escalationReason: string;
  aiDraft: string;
  chat: ChatMessage[];
}

const mockEscalatedTickets: Ticket[] = [
  {
    id: "TCK-4892",
    customer: "sarah_connors",
    time: "2m ago",
    title: "Refund exception on damaged packaging",
    escalationReason: "Critic Agent Confidence: 0.54. Flagged for manual review due to conflicting policy on 'original packaging intact' vs 'transit damage'.",
    aiDraft: "Hi Sarah, I understand the packaging arrived damaged. Since the product itself is unharmed and you're within the 7-day window, I can approve a one-time exception for a full return. Shall I generate the shipping label for you?",
    chat: [
      { sender: 'user', text: "I want to return my TechNova BudsAir. They work fine but the box was completely crushed when I got it." },
      { sender: 'bot', text: "I'm sorry to hear your package arrived damaged! I'd be happy to help you with a return. Just a moment while I check the policy..." },
      { sender: 'user', text: "But your policy says 'original packaging intact'. Is it still okay to return?" },
    ]
  },
  {
    id: "TCK-4893",
    customer: "john_doe",
    time: "15m ago",
    title: "Harassment/Frustration Trigger",
    escalationReason: "Intent: ANGRY_CUSTOMER detected. Automatic hard escalation triggered to de-escalate tension.",
    aiDraft: "Hi John, I am a senior support specialist. I apologize for the massive delay you've experienced with your ProBook delivery. I am personally taking over this case and will issue a 10% refund for the inconvenience right now. Let me check the exact carrier status.",
    chat: [
      { sender: 'user', text: "Where the hell is my order ORD-9921? It's been 3 weeks!" },
      { sender: 'bot', text: "I apologize for the delay. Let me check the status of ORD-9921 for you." },
      { sender: 'user', text: "I don't want to talk to a bot, give me a human manager NOW!" },
    ]
  }
];

export default function AdminTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [draftSent, setDraftSent] = useState(false);

  const columns = [
    { title: "New", count: 12, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "In Progress (AI)", count: 4, color: "text-purple-400", bg: "bg-purple-400/10" },
    { title: "Escalated (Human)", count: mockEscalatedTickets.length, color: "text-red-400", bg: "bg-red-400/10", isEscalated: true },
    { title: "Resolved", count: 142, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  const handleSendDraft = () => {
    setDraftSent(true);
    setTimeout(() => {
      setSelectedTicket(null);
      setDraftSent(false);
    }, 1500);
  };

  return (
    <div className="relative space-y-8 h-full flex flex-col overflow-hidden">
      <header className="border-b border-[var(--color-admin-border)] pb-6 shrink-0">
        <h1 className="text-3xl font-display font-bold text-[var(--color-admin-foreground)]">Ticket Operations</h1>
        <p className="text-[var(--color-admin-muted)] text-sm mt-1">Manage and monitor customer escalations and AI resolutions.</p>
      </header>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 min-w-[1000px] h-full pb-4">
          {columns.map((col, i) => (
            <div key={i} className="flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[var(--color-admin-border)] pb-2">
                <h3 className="font-bold text-sm tracking-wider uppercase">{col.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${col.bg} ${col.color}`}>{col.count}</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-3">
                {col.isEscalated ? (
                  mockEscalatedTickets.map((ticket) => (
                    <GlassCard 
                      key={ticket.id} 
                      dark 
                      className={`p-4 cursor-pointer transition-all ${selectedTicket?.id === ticket.id ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)] scale-[1.02]' : 'hover:border-[var(--color-admin-accent)]'}`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-[var(--color-admin-muted)]">#{ticket.id}</span>
                        <span className={`w-2 h-2 rounded-full ${col.bg.replace('/10', '')} animate-pulse`}></span>
                      </div>
                      <h4 className="font-bold text-sm mb-2 line-clamp-2">{ticket.title}</h4>
                      <div className="flex justify-between items-center text-xs opacity-60">
                        <span>@{ticket.customer}</span>
                        <span>{ticket.time}</span>
                      </div>
                    </GlassCard>
                  ))
                ) : (
                  <div className="text-center text-xs text-[var(--color-admin-muted)] mt-10 opacity-50">
                    No items in this queue for demo.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Assist Side Panel */}
      <div 
        className={`absolute top-0 right-0 w-[450px] h-full bg-slate-950/95 border-l border-slate-800 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col z-50 ${selectedTicket ? 'translate-x-0' : 'translate-x-[110%]'}`}
      >
        {selectedTicket && (
          <>
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Agent Assist Portal</span>
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded uppercase tracking-wider font-bold">Copilot Active</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-mono">#{selectedTicket.id} • @{selectedTicket.customer}</p>
              </div>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
              
              {/* Escalation Context */}
              <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
                  <span>⚠️</span> Escalation Reason
                </h3>
                <p className="text-sm text-red-200/80 font-mono leading-relaxed">
                  {selectedTicket.escalationReason}
                </p>
              </div>

              {/* Chat Trace */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Customer Chat Trace</h3>
                <div className="space-y-3 bg-slate-900/30 border border-slate-800/50 rounded-xl p-4">
                  {selectedTicket.chat.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-slate-500 mb-1">{msg.sender === 'user' ? 'Customer' : 'NexaBot AI'}</span>
                      <div className={`p-2.5 rounded-lg max-w-[85%] text-sm ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* AI Drafted Response */}
            <div className="p-5 border-t border-slate-800 bg-slate-900/80 shrink-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <span>✨</span> AI Drafted Response
              </h3>
              <div className="bg-black/50 border border-slate-700 rounded-xl p-3 mb-4">
                <textarea 
                  className="w-full bg-transparent text-sm text-slate-200 focus:outline-none resize-none min-h-[100px]"
                  defaultValue={selectedTicket.aiDraft}
                />
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  Edit Draft
                </button>
                <button 
                  onClick={handleSendDraft}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
                    draftSent 
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20'
                  }`}
                >
                  {draftSent ? 'Sent! ✓' : 'Approve & Send'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
