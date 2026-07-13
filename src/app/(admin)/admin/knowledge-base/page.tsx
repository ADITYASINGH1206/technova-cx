"use client";

import { motion } from "framer-motion";
import { BookOpen, Plus, Search, Edit3, Eye, History } from "lucide-react";
import { useState } from "react";

const kbEntries = [
  { id: "RR-001", category: "Returns & Refunds", title: "Return Window", version: 2, usedIn: 23, lastUpdated: "2 days ago" },
  { id: "RR-002", category: "Returns & Refunds", title: "Refund Processing", version: 2, usedIn: 18, lastUpdated: "1 week ago" },
  { id: "SD-001", category: "Shipping & Delivery", title: "Delivery Timeline", version: 3, usedIn: 34, lastUpdated: "3 days ago" },
  { id: "SD-002", category: "Shipping & Delivery", title: "Free Shipping Policy", version: 2, usedIn: 15, lastUpdated: "5 days ago" },
  { id: "WR-001", category: "Warranty & Repairs", title: "Standard Warranty Coverage", version: 2, usedIn: 42, lastUpdated: "1 day ago" },
  { id: "WR-003", category: "Warranty & Repairs", title: "Warranty Claim Process", version: 3, usedIn: 28, lastUpdated: "4 days ago" },
  { id: "BP-001", category: "Billing & Payments", title: "Accepted Payment Methods", version: 2, usedIn: 12, lastUpdated: "2 weeks ago" },
  { id: "RE-001", category: "Replacement & Exchange", title: "Replacement Policy", version: 2, usedIn: 9, lastUpdated: "1 week ago" },
  { id: "OC-001", category: "Order Cancellation", title: "Cancellation Window", version: 2, usedIn: 7, lastUpdated: "6 days ago" },
  { id: "AS-001", category: "Account & Security", title: "Account Security", version: 2, usedIn: 5, lastUpdated: "3 weeks ago" },
];

export default function AdminKnowledgeBasePage() {
  const [search, setSearch] = useState("");

  const filtered = kbEntries.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Knowledge Base</h1>
          <p className="text-admin-text-secondary text-sm">Manage policy snippets that NexaBot uses for grounded answers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-brand text-white text-sm font-medium shadow-lg">
          <Plus className="w-4 h-4" /> Add Policy
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-text-tertiary" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search policies..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-admin-surface border border-admin-border focus:border-admin-accent outline-none text-sm text-white placeholder-admin-text-tertiary"
        />
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-admin-border">
                <th className="text-left px-4 py-3 text-xs text-admin-text-tertiary uppercase tracking-wider font-medium">ID</th>
                <th className="text-left px-4 py-3 text-xs text-admin-text-tertiary uppercase tracking-wider font-medium">Title</th>
                <th className="text-left px-4 py-3 text-xs text-admin-text-tertiary uppercase tracking-wider font-medium">Category</th>
                <th className="text-center px-4 py-3 text-xs text-admin-text-tertiary uppercase tracking-wider font-medium">Ver</th>
                <th className="text-center px-4 py-3 text-xs text-admin-text-tertiary uppercase tracking-wider font-medium">Used In</th>
                <th className="text-left px-4 py-3 text-xs text-admin-text-tertiary uppercase tracking-wider font-medium">Updated</th>
                <th className="text-right px-4 py-3 text-xs text-admin-text-tertiary uppercase tracking-wider font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-admin-border/50 hover:bg-admin-surface-elevated/50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-admin-text-tertiary">{entry.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{entry.title}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] bg-admin-surface-elevated text-admin-text-secondary">
                      {entry.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-admin-text-secondary font-mono">v{entry.version}</td>
                  <td className="px-4 py-3 text-center text-xs text-admin-accent">{entry.usedIn} answers</td>
                  <td className="px-4 py-3 text-xs text-admin-text-tertiary">{entry.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg text-admin-text-tertiary hover:text-admin-accent hover:bg-admin-surface-elevated transition-all">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg text-admin-text-tertiary hover:text-admin-accent hover:bg-admin-surface-elevated transition-all">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg text-admin-text-tertiary hover:text-admin-accent hover:bg-admin-surface-elevated transition-all">
                        <History className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
