"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-[var(--color-admin-border)] pb-6">
        <h1 className="text-3xl font-display font-bold text-[var(--color-admin-foreground)]">Overview</h1>
        <p className="text-[var(--color-admin-muted)] text-sm mt-1">Real-time command center status.</p>
      </header>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Tickets", value: "142", trend: "+12%" },
          { label: "AI Resolution Rate", value: "84.5%", trend: "+2.1%" },
          { label: "Avg Response Time", value: "45s", trend: "-15s" },
          { label: "Live Agents Online", value: "12", trend: "Stable" },
        ].map((metric, i) => (
          <GlassCard dark key={i} className="flex flex-col gap-2">
            <span className="text-[var(--color-admin-foreground)] opacity-70 text-xs uppercase tracking-wider">{metric.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{metric.value}</span>
              <span className="text-[var(--color-admin-accent)] text-sm font-medium">{metric.trend}</span>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* Main Split Screen Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Terminal / Trace Logs */}
        <div className="lg:col-span-2">
          <GlassCard dark className="h-[500px] flex flex-col">
            <div className="border-b border-[var(--color-admin-border)] pb-4 mb-4">
              <h2 className="font-display font-bold">Live NexaBot Trace Logs</h2>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-xs space-y-3 opacity-80">
              <div className="flex gap-4">
                <span className="text-[var(--color-admin-accent)]">[14:32:01]</span>
                <span className="text-blue-400">INFO</span>
                <span>Incoming intent recognized: PRODUCT_INQUIRY (confidence: 0.98)</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-admin-accent)]">[14:32:02]</span>
                <span className="text-purple-400">RAG_FETCH</span>
                <span>Querying context for "AeroPhone Pro battery life" -> Found 2 chunks.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-admin-accent)]">[14:32:04]</span>
                <span className="text-green-400">SUCCESS</span>
                <span>Response generated and cited. Latency: 1.2s.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-admin-accent)]">[14:35:11]</span>
                <span className="text-yellow-400">WARN</span>
                <span>User escalating to human agent. Category: WARRANTY_DISPUTE.</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-admin-accent)]">[14:35:12]</span>
                <span className="text-blue-400">INFO</span>
                <span>Ticket #8492 routed to Agent Pool B.</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Action / Escalation Queue */}
        <div>
          <GlassCard dark className="h-[500px] flex flex-col">
            <div className="border-b border-[var(--color-admin-border)] pb-4 mb-4">
              <h2 className="font-display font-bold">Escalation Queue</h2>
            </div>
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
              <div className="p-3 bg-[var(--color-admin-background)] border border-[var(--color-admin-border)] rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[var(--color-admin-destructive)] font-bold">URGENT</span>
                  <span className="text-xs opacity-60">2m ago</span>
                </div>
                <p className="text-sm">Payment failure repeatedly on Checkout for user: @sarah_connors</p>
                <button className="mt-3 w-full py-1.5 bg-[var(--color-admin-border)] text-xs rounded hover:bg-[var(--color-admin-foreground)] hover:text-black transition-colors">
                  Take Ticket
                </button>
              </div>
              <div className="p-3 bg-[var(--color-admin-background)] border border-[var(--color-admin-border)] rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-yellow-500 font-bold">MEDIUM</span>
                  <span className="text-xs opacity-60">15m ago</span>
                </div>
                <p className="text-sm">Technical support required for NovaBook Pro X15 display artifacts.</p>
                <button className="mt-3 w-full py-1.5 bg-[var(--color-admin-border)] text-xs rounded hover:bg-[var(--color-admin-foreground)] hover:text-black transition-colors">
                  Take Ticket
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
