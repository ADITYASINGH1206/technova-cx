"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export default function SupportPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto h-[80vh] min-h-[600px] flex flex-col">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)] mb-8 text-center">NexaBot Support Hub</h1>
      
      <GlassCard className="flex-1 flex flex-col overflow-hidden p-0">
        <div className="p-4 border-b border-[var(--color-sf-border)] bg-white/40 flex items-center gap-4">
          <div className="w-10 h-10 bg-[var(--color-sf-primary)] rounded-full flex items-center justify-center text-white text-xl">
            🤖
          </div>
          <div>
            <h2 className="font-bold">NexaBot</h2>
            <p className="text-xs opacity-60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Online & Ready
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[var(--color-sf-primary)] rounded-full shrink-0 flex items-center justify-center text-white text-sm">
              🤖
            </div>
            <div className="bg-white/60 border border-[var(--color-sf-border)] rounded-2xl rounded-tl-sm p-4 max-w-[80%] shadow-sm">
              <p className="text-sm">Hi Sarah! I'm NexaBot, your TechNova assistant. I see you recently received your <strong>AeroPhone Pro</strong>. Are you experiencing any issues, or do you have a question about it?</p>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 bg-[var(--color-sf-foreground)] rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs">
              SC
            </div>
            <div className="bg-[var(--color-sf-primary)] text-white rounded-2xl rounded-tr-sm p-4 max-w-[80%] shadow-md shadow-[var(--color-sf-primary)]/20">
              <p className="text-sm">Yes, how do I set up the wireless charging?</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-[var(--color-sf-primary)] rounded-full shrink-0 flex items-center justify-center text-white text-sm">
              🤖
            </div>
            <div className="bg-white/60 border border-[var(--color-sf-border)] rounded-2xl rounded-tl-sm p-4 max-w-[80%] shadow-sm space-y-3">
              <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md">
                INTENT: SETUP_GUIDE
              </div>
              <p className="text-sm">To set up wireless charging on your AeroPhone Pro:</p>
              <ol className="text-sm list-decimal list-inside opacity-80 space-y-1">
                <li>Ensure you have a Qi-certified charger (like our OmniCharge Pad).</li>
                <li>Connect the charger to a power source.</li>
                <li>Place your AeroPhone Pro face up on the center of the pad.</li>
              </ol>
              <div className="pt-2 border-t border-[var(--color-sf-border)] flex flex-wrap gap-2">
                <span className="text-xs bg-black/5 px-2 py-1 rounded cursor-pointer hover:bg-black/10 transition-colors">Citation: Manual pg.12</span>
                <span className="text-xs bg-black/5 px-2 py-1 rounded cursor-pointer hover:bg-black/10 transition-colors">View OmniCharge Pad</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white/40 border-t border-[var(--color-sf-border)]">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-white/60 border border-[var(--color-sf-border)] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
            <button className="w-10 h-10 bg-[var(--color-sf-primary)] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              ↑
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
