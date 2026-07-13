"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Send, Bot, Shield, Sparkles, Loader2 } from "lucide-react";

export default function AdminPlaygroundPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | {
    response: string;
    confidence: number;
    claims: { claim: string; supported: boolean; source: string }[];
  }>(null);

  const handleTest = () => {
    if (!query.trim()) return;
    setIsLoading(true);

    // Simulated response
    setTimeout(() => {
      setResult({
        response: "Products can be returned within 7 days of delivery. The item must be unused, in its original packaging, with all accessories and tags intact.",
        confidence: 0.92,
        claims: [
          { claim: "7-day return window", supported: true, source: "policy:RR-001 v2" },
          { claim: "Must be unused and in original packaging", supported: true, source: "policy:RR-001 v2" },
        ],
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1 flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-admin-accent" />
          Playground
        </h1>
        <p className="text-admin-text-secondary text-sm">
          Test queries against the knowledge base before publishing changes
        </p>
      </div>

      {/* Query Input */}
      <div className="admin-card p-6">
        <label className="text-sm font-medium text-white mb-2 block">Test Query</label>
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTest()}
            placeholder="e.g., What's your return policy?"
            className="flex-1 px-4 py-3 rounded-xl bg-admin-surface-elevated border border-admin-border focus:border-admin-accent outline-none text-sm text-white placeholder-admin-text-tertiary"
          />
          <button
            onClick={handleTest}
            disabled={!query.trim() || isLoading}
            className="px-5 py-3 rounded-xl gradient-brand text-white font-medium disabled:opacity-50 transition-all"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Agent Response */}
          <div className="admin-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-semibold text-white">Support Agent Response</span>
            </div>
            <p className="text-sm text-admin-text-secondary leading-relaxed">{result.response}</p>
          </div>

          {/* Critic Verdict */}
          <div className="admin-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success-400" />
                <span className="text-sm font-semibold text-white">Critic Verdict</span>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${result.confidence >= 0.6 ? "bg-success-500/10 text-success-400" : "bg-danger-400/10 text-danger-400"}`}>
                {result.confidence >= 0.6 ? "PASS" : "FAIL"} · {result.confidence.toFixed(2)}
              </span>
            </div>
            <div className="space-y-2">
              {result.claims.map((claim, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-admin-surface-elevated/50">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${claim.supported ? "bg-success-400" : "bg-danger-400"}`} />
                  <div className="flex-1">
                    <p className="text-sm text-white">{claim.claim}</p>
                    <p className="text-xs text-admin-text-tertiary font-mono">{claim.source}</p>
                  </div>
                  <span className={`text-xs font-medium ${claim.supported ? "text-success-400" : "text-danger-400"}`}>
                    {claim.supported ? "Supported" : "Unsupported"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
