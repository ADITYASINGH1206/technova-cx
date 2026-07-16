"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-[var(--color-admin-border)] pb-6">
        <h1 className="text-3xl font-display font-bold text-[var(--color-admin-foreground)]">Analytics</h1>
        <p className="text-[var(--color-admin-muted)] text-sm mt-1">AI performance and resolution metrics.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard dark className="h-80 flex flex-col">
          <h3 className="font-bold text-sm mb-4">Resolution Rate (Last 30 Days)</h3>
          <div className="flex-1 flex items-end gap-2">
            {/* Mock Chart Bars */}
            {[40, 55, 45, 60, 75, 65, 80, 85, 82, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-[var(--color-admin-accent)]/20 hover:bg-[var(--color-admin-accent)]/40 transition-colors rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs opacity-50 font-mono">
            <span>Oct 1</span>
            <span>Oct 30</span>
          </div>
        </GlassCard>

        <GlassCard dark className="h-80 flex flex-col">
          <h3 className="font-bold text-sm mb-4">Common Intents</h3>
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>ORDER_STATUS</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-admin-border)] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[45%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>PRODUCT_INQUIRY</span>
                <span>30%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-admin-border)] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[30%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>TROUBLESHOOTING</span>
                <span>15%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-admin-border)] rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[15%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>WARRANTY_CLAIM</span>
                <span>10%</span>
              </div>
              <div className="w-full h-2 bg-[var(--color-admin-border)] rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[10%]"></div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
