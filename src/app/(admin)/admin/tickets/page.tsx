"use client";

import { motion } from "framer-motion";
import { Ticket, AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react";

const tickets = [
  { id: "TCK-4521", customer: "Ananya S.", category: "Warranty", reason: "low_confidence", confidence: 0.42, priority: "High", status: "Open", time: "2m ago" },
  { id: "TCK-4520", customer: "Rahul K.", category: "Billing", reason: "customer_request", priority: "Medium", status: "Open", time: "15m ago" },
  { id: "TCK-4519", customer: "Priya M.", category: "Return", reason: "hard_trigger_refund", confidence: 0.85, priority: "Urgent", status: "In Progress", time: "1h ago" },
  { id: "TCK-4518", customer: "Vikram R.", category: "Delivery Delay", reason: "unresolved_turns", priority: "Medium", status: "In Progress", time: "2h ago" },
  { id: "TCK-4517", customer: "Meera J.", category: "Product Quality", reason: "low_confidence", confidence: 0.38, priority: "High", status: "Resolved", time: "5h ago" },
  { id: "TCK-4516", customer: "Arjun P.", category: "Service", reason: "customer_request", priority: "Low", status: "Closed", time: "1d ago" },
  { id: "TCK-4515", customer: "Sneha T.", category: "Replacement", reason: "hard_trigger_legal", priority: "Urgent", status: "Open", time: "1d ago" },
];

const columns = ["Open", "In Progress", "Resolved", "Closed"];

const priorityColors: Record<string, string> = {
  Urgent: "text-danger-400 bg-danger-400/10",
  High: "text-warning-400 bg-warning-400/10",
  Medium: "text-brand-400 bg-brand-400/10",
  Low: "text-admin-text-tertiary bg-admin-surface-elevated",
};

export default function AdminTicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Escalation Tickets</h1>
          <p className="text-admin-text-secondary text-sm">Kanban board — drag to update status</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-admin-text-tertiary">
          <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-danger-400" /> {tickets.filter(t => t.status === "Open").length} Open</span>
          <span>·</span>
          <span>{tickets.filter(t => t.priority === "Urgent").length} Urgent</span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTickets = tickets.filter((t) => t.status === col);
          return (
            <div key={col} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <h2 className="text-sm font-semibold text-white">{col}</h2>
                <span className="px-1.5 py-0.5 rounded text-xs font-mono bg-admin-surface-elevated text-admin-text-tertiary">
                  {colTickets.length}
                </span>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {colTickets.map((ticket, i) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="admin-card p-3 cursor-pointer hover:border-admin-accent transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-admin-text-tertiary">{ticket.id}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityColors[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white mb-1">{ticket.customer}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-admin-surface-elevated text-admin-text-secondary">
                        {ticket.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-admin-text-tertiary">
                      <span>{ticket.reason.replace(/_/g, " ")}</span>
                      {ticket.confidence !== undefined && (
                        <span className={ticket.confidence < 0.6 ? "text-danger-400" : "text-success-400"}>
                          {ticket.confidence.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-admin-text-tertiary mt-2">{ticket.time}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
