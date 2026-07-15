"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminKnowledgeBasePage() {
  const kbEntries = [
    { id: "DOC-101", title: "AeroPhone Pro User Manual", status: "Active", vectors: 120, lastUpdated: "2024-10-24" },
    { id: "DOC-102", title: "NovaBook X15 Troubleshooting", status: "Active", vectors: 85, lastUpdated: "2024-10-22" },
    { id: "DOC-103", title: "OmniCharge Compatibility List", status: "Draft", vectors: 0, lastUpdated: "2024-10-28" },
    { id: "DOC-104", title: "Return Policy 2024", status: "Active", vectors: 45, lastUpdated: "2024-01-15" },
    { id: "DOC-105", title: "Internal: Escalation Protocols", status: "Internal", vectors: 30, lastUpdated: "2024-09-10" },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end border-b border-[var(--color-admin-border)] pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-admin-foreground)]">Knowledge Base</h1>
          <p className="text-[var(--color-admin-muted)] text-sm mt-1">Manage RAG vectors and source documentation for NexaBot.</p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-admin-foreground)] text-black font-bold rounded-lg hover:bg-[var(--color-admin-accent)] transition-colors text-sm">
          Upload Document
        </button>
      </header>

      <GlassCard dark className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-admin-border)] text-[var(--color-admin-muted)] uppercase tracking-wider text-xs">
              <th className="py-4 px-4 font-bold">ID</th>
              <th className="py-4 px-4 font-bold">Title</th>
              <th className="py-4 px-4 font-bold">Status</th>
              <th className="py-4 px-4 font-bold">Vector Chunks</th>
              <th className="py-4 px-4 font-bold">Last Sync</th>
              <th className="py-4 px-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-admin-border)]">
            {kbEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-4 font-mono text-xs opacity-70">{entry.id}</td>
                <td className="py-4 px-4 font-medium">{entry.title}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                    entry.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    entry.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {entry.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono text-xs opacity-70">{entry.vectors}</td>
                <td className="py-4 px-4 opacity-70">{entry.lastUpdated}</td>
                <td className="py-4 px-4 text-right">
                  <button className="text-[var(--color-admin-accent)] opacity-0 group-hover:opacity-100 transition-opacity font-medium hover:underline text-xs">
                    Edit/Resync
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
