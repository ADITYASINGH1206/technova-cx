"use client";

import { motion } from "framer-motion";
import { Activity, MessageCircle, Ticket, TrendingUp, Clock, Shield } from "lucide-react";

const stats = [
  { label: "Active Chats", value: "3", icon: MessageCircle, change: "+2 today", color: "text-brand-400" },
  { label: "Open Tickets", value: "7", icon: Ticket, change: "2 urgent", color: "text-warning-400" },
  { label: "Deflection Rate", value: "87%", icon: TrendingUp, change: "+5% this week", color: "text-success-400" },
  { label: "Avg. Confidence", value: "0.91", icon: Shield, change: "Across 42 chats", color: "text-accent-400" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Command Center</h1>
        <p className="text-admin-text-secondary text-sm">Real-time monitoring and live trace console</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="admin-card p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-admin-text-tertiary uppercase tracking-wider">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-admin-text-tertiary mt-1">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content: Live Chat + Trace */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live Chats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="admin-card overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-admin-border flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-brand-400" />
              Live Conversations
            </h2>
            <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
          </div>
          <div className="p-4 space-y-3">
            {[
              { user: "Ananya S.", message: "My earbuds stopped charging...", intent: "SUPPORT", time: "2m ago" },
              { user: "Rahul K.", message: "What's your return window?", intent: "POLICY_FAQ", time: "5m ago" },
              { user: "Priya M.", message: "Where's my order ORD-7734?", intent: "SUPPORT", time: "8m ago" },
            ].map((chat, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-admin-surface-elevated/50 hover:bg-admin-surface-elevated transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {chat.user.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{chat.user}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-admin-accent/10 text-admin-accent">
                      {chat.intent}
                    </span>
                  </div>
                  <p className="text-xs text-admin-text-tertiary truncate">{chat.message}</p>
                </div>
                <span className="text-xs text-admin-text-tertiary shrink-0">{chat.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live Trace Console */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="admin-card overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-admin-border flex items-center justify-between">
            <h2 className="font-semibold text-white text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-success-400" />
              Live Trace
            </h2>
            <span className="text-xs text-admin-text-tertiary font-mono">streaming</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-1.5 bg-black/30 min-h-[280px]">
            {[
              { time: "10:42:01", msg: "Session started · customer_id=CUS-1092", color: "text-admin-text-secondary" },
              { time: "10:42:01", msg: "Orchestrator → Intent classified: SUPPORT (0.94)", color: "text-brand-400" },
              { time: "10:42:02", msg: "Support Agent → Tool call: check_warranty(\"PRD-018\")", color: "text-accent-400" },
              { time: "10:42:02", msg: "Tool result: covered=true, expires=Dec 2026", color: "text-success-400" },
              { time: "10:42:03", msg: "Support Agent → retrieve_policy(\"warranty claim process\")", color: "text-accent-400" },
              { time: "10:42:03", msg: "RAG result: 2 chunks, top: WR-003 v3 (score: 0.89)", color: "text-success-400" },
              { time: "10:42:03", msg: "Support Agent → Draft response generated", color: "text-admin-text-secondary" },
              { time: "10:42:04", msg: "Critic Agent → Checking 3 claims against 2 sources", color: "text-warning-400" },
              { time: "10:42:04", msg: "Critic Agent → Verdict: PASS · confidence=0.94", color: "text-success-400" },
              { time: "10:42:04", msg: "Response delivered to customer ✓", color: "text-success-400" },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-2"
              >
                <span className="text-admin-text-tertiary shrink-0">[{line.time}]</span>
                <span className={line.color}>{line.msg}</span>
              </motion.div>
            ))}
            <div className="flex items-center gap-1 mt-2">
              <span className="text-admin-text-tertiary">▋</span>
              <span className="w-1.5 h-3 bg-success-400 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
