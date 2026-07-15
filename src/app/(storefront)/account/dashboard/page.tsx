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
            <Link href="/account/orders" className="px-4 py-2 hover:bg-white/50 rounded-lg transition-colors">Order History</Link>
            <Link href="/account/settings" className="px-4 py-2 hover:bg-white/50 rounded-lg transition-colors">Settings</Link>
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
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-white/40 rounded-lg">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 bg-white/60 rounded flex shrink-0"></div>
                <div>
                  <h4 className="font-bold text-sm">Order #8492-22</h4>
                  <p className="text-xs opacity-60">Placed on Oct 24, 2024</p>
                </div>
              </div>
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Delivered</span>
                <span className="font-bold">$299.00</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-white/40 rounded-lg">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 bg-white/60 rounded flex shrink-0"></div>
                <div>
                  <h4 className="font-bold text-sm">Order #8111-99</h4>
                  <p className="text-xs opacity-60">Placed on Sep 12, 2024</p>
                </div>
              </div>
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-bold">Returned</span>
                <span className="font-bold">$1,299.00</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
