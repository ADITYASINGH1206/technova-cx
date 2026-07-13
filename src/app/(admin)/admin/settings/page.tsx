"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Sliders, Shield, AlertTriangle, Save, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [threshold, setThreshold] = useState(0.6);
  const [saved, setSaved] = useState(false);
  const [keywords, setKeywords] = useState(
    "lawyer, legal notice, consumer court, FIR, hacked, unauthorized login, OTP fraud, talk to a human, real person, speak to someone"
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Agent Settings</h1>
        <p className="text-admin-text-secondary text-sm">Configure confidence threshold and escalation triggers</p>
      </div>

      {/* Confidence Threshold */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card p-6"
      >
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-admin-accent" />
          Confidence Threshold
        </h2>
        <p className="text-sm text-admin-text-secondary mb-4">
          Responses below this confidence level are automatically escalated to a human agent.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-admin-text-tertiary font-mono">0.4</span>
          <input
            type="range"
            min="0.4"
            max="0.8"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="flex-1 accent-admin-accent h-2"
          />
          <span className="text-xs text-admin-text-tertiary font-mono">0.8</span>
        </div>
        <div className="mt-3 text-center">
          <span className="text-3xl font-bold text-white font-mono">{threshold.toFixed(2)}</span>
          <p className="text-xs text-admin-text-tertiary mt-1">
            {threshold < 0.5 ? "Very permissive — more AI responses shown" : threshold > 0.7 ? "Very strict — more escalations to humans" : "Balanced — recommended default"}
          </p>
        </div>
      </motion.div>

      {/* Hard Trigger Keywords */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="admin-card p-6"
      >
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning-400" />
          Hard Trigger Keywords
        </h2>
        <p className="text-sm text-admin-text-secondary mb-4">
          Messages containing these keywords bypass the AI pipeline entirely and create an escalation ticket immediately.
        </p>
        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-admin-surface-elevated border border-admin-border focus:border-admin-accent outline-none text-sm text-white font-mono placeholder-admin-text-tertiary resize-none"
          placeholder="Comma-separated keywords..."
        />
        <p className="text-xs text-admin-text-tertiary mt-2">Separate keywords with commas</p>
      </motion.div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-medium shadow-lg hover:shadow-xl transition-all"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
