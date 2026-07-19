"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

export default function AccountDashboardPage() {
  return (
    <div className="py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <GlassCard className="sticky top-32 space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[var(--color-sf-primary)] text-white flex items-center justify-center font-bold text-lg">
              SC
            </div>
            <div>
              <h2 className="font-bold">Sarah Connors</h2>
              <p className="text-xs opacity-60">sarah@example.com</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link href="/account/dashboard" className="px-4 py-2 bg-[var(--color-sf-primary)]/10 text-[var(--color-sf-primary)] rounded-lg">Dashboard</Link>
            <Link href="/account/orders" className="px-4 py-2 hover:bg-white/50 dark:bg-slate-800/50 rounded-lg transition-colors">Order History</Link>
            <Link href="/account/settings" className="px-4 py-2 hover:bg-white/50 dark:bg-slate-800/50 rounded-lg transition-colors">Settings</Link>
            <button className="px-4 py-2 text-left text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-4">Sign Out</button>
          </nav>
        </GlassCard>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Account Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="space-y-2">
            <h3 className="font-bold">TechNova Rewards</h3>
            <p className="text-3xl font-bold text-[var(--color-sf-primary)]">2,450 <span className="text-sm font-normal text-[var(--color-sf-foreground)]">pts</span></p>
            <p className="text-xs opacity-60">Platinum Member</p>
          </GlassCard>
          <GlassCard className="space-y-2">
            <h3 className="font-bold">Saved Payment</h3>
            <p className="font-mono mt-2">•••• •••• •••• 4242</p>
            <p className="text-xs opacity-60">Expires 12/26</p>
          </GlassCard>
        </div>

        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--color-sf-border)] pb-4">
            <h2 className="font-bold text-lg">Recent Orders</h2>
            <Link href="/account/orders" className="text-sm text-[var(--color-sf-primary)] hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/40 dark:bg-slate-800/40 rounded flex items-center justify-center shrink-0 opacity-60">Img</div>
                <div>
                  <p className="font-bold text-sm">AeroPhone Pro</p>
                  <p className="text-xs opacity-60">Placed on Oct 24, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold">₹29,999</span>
                <p className="text-xs text-[var(--color-sf-primary)] font-bold">Shipped</p>
              </div>
            </div>
            
            <hr className="border-[var(--color-sf-border)]" />
            
            <div className="flex justify-between items-center py-3">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/40 dark:bg-slate-800/40 rounded flex items-center justify-center shrink-0 opacity-60">Img</div>
                <div>
                  <p className="font-bold text-sm">NovaBook X15</p>
                  <p className="text-xs opacity-60">Placed on Sep 12, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold">₹1,24,999</span>
                <p className="text-xs text-green-600 font-bold">Delivered</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
