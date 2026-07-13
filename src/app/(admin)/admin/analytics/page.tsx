"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Shield, MessageCircle, Ticket, Clock, ThumbsUp } from "lucide-react";

const metrics = [
  { label: "Deflection Rate", value: "87%", change: "+5%", trend: "up", icon: TrendingUp, description: "Conversations resolved without human intervention" },
  { label: "Hallucinations Prevented", value: "14", change: "This week", trend: "up", icon: Shield, description: "Responses caught by the Critic Agent" },
  { label: "Avg. Critic Confidence", value: "0.91", change: "+0.03", trend: "up", icon: Shield, description: "Mean confidence score across all checked responses" },
  { label: "Total Conversations", value: "42", change: "Last 7 days", trend: "up", icon: MessageCircle, description: "Customer support conversations" },
  { label: "Escalation Rate", value: "13%", change: "-3%", trend: "down", icon: Ticket, description: "Conversations routed to human agents" },
  { label: "Avg. Resolution Time", value: "2.3m", change: "-12s", trend: "down", icon: Clock, description: "Average time to resolve a query" },
  { label: "CSAT Score", value: "4.6/5", change: "+0.2", trend: "up", icon: ThumbsUp, description: "Customer satisfaction from thumbs up/down" },
  { label: "Cache Hit Rate", value: "23%", change: "+8%", trend: "up", icon: TrendingUp, description: "FAQ responses served from cache" },
];

const escalationReasons = [
  { reason: "Low confidence", count: 5, pct: 36 },
  { reason: "Customer request", count: 3, pct: 21 },
  { reason: "High-value refund", count: 3, pct: 21 },
  { reason: "Unresolved turns", count: 2, pct: 14 },
  { reason: "Legal keywords", count: 1, pct: 7 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Analytics</h1>
        <p className="text-admin-text-secondary text-sm">Performance metrics and AI quality indicators</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="admin-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-admin-text-tertiary">{m.label}</span>
                <Icon className={`w-4 h-4 ${m.trend === "up" ? "text-success-400" : "text-danger-400"}`} />
              </div>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className={`text-xs mt-1 ${m.trend === "up" ? "text-success-400" : "text-danger-400"}`}>
                {m.change}
              </p>
              <p className="text-[10px] text-admin-text-tertiary mt-1">{m.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Escalation Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="admin-card p-6"
      >
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Ticket className="w-4 h-4 text-warning-400" />
          Escalation Reason Breakdown
        </h2>
        <div className="space-y-3">
          {escalationReasons.map((r) => (
            <div key={r.reason} className="flex items-center gap-3">
              <span className="text-sm text-admin-text-secondary w-40 shrink-0">{r.reason}</span>
              <div className="flex-1 bg-admin-surface-elevated rounded-full h-2.5">
                <div
                  className="h-full rounded-full gradient-brand transition-all"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <span className="text-xs text-admin-text-tertiary w-16 text-right">{r.count} ({r.pct}%)</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
