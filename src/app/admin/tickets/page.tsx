"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminTicketsPage() {
  const columns = [
    { title: "New", count: 12, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "In Progress (AI)", count: 4, color: "text-purple-400", bg: "bg-purple-400/10" },
    { title: "Escalated (Human)", count: 3, color: "text-red-400", bg: "bg-red-400/10" },
    { title: "Resolved", count: 142, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="space-y-8 h-full flex flex-col">
      <header className="border-b border-[var(--color-admin-border)] pb-6">
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
                {/* Dummy Card */}
                <GlassCard dark className="p-4 cursor-pointer hover:border-[var(--color-admin-accent)] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-[var(--color-admin-muted)]">#TK-8492</span>
                    <span className={`w-2 h-2 rounded-full ${col.bg.replace('/10', '')}`}></span>
                  </div>
                  <h4 className="font-bold text-sm mb-2 line-clamp-2">Payment failure repeatedly on Checkout for user</h4>
                  <div className="flex justify-between items-center text-xs opacity-60">
                    <span>@sarah_connors</span>
                    <span>2m ago</span>
                  </div>
                </GlassCard>
                
                {/* Optional Second Dummy Card to show stack */}
                {i % 2 === 0 && (
                  <GlassCard dark className="p-4 cursor-pointer hover:border-[var(--color-admin-accent)] transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-[var(--color-admin-muted)]">#TK-8493</span>
                      <span className={`w-2 h-2 rounded-full ${col.bg.replace('/10', '')}`}></span>
                    </div>
                    <h4 className="font-bold text-sm mb-2 line-clamp-2">Display artifacts on X15</h4>
                    <div className="flex justify-between items-center text-xs opacity-60">
                      <span>@johndoe</span>
                      <span>15m ago</span>
                    </div>
                  </GlassCard>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
