"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

export default function AccountSettingsPage() {
  return (
    <div className="py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <GlassCard className="sticky top-32 space-y-4">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link href="/account/dashboard" className="px-4 py-2 hover:bg-white/50 dark:bg-slate-800/50 rounded-lg transition-colors">Dashboard</Link>
            <Link href="/account/orders" className="px-4 py-2 hover:bg-white/50 dark:bg-slate-800/50 rounded-lg transition-colors">Order History</Link>
            <Link href="/account/settings" className="px-4 py-2 bg-[var(--color-sf-primary)]/10 text-[var(--color-sf-primary)] rounded-lg">Settings</Link>
          </nav>
        </GlassCard>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Account Settings</h1>
        
        <GlassCard className="space-y-6">
          <h2 className="font-bold text-lg">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium opacity-80 mb-1">First Name</label>
              <input type="text" defaultValue="Sarah" className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium opacity-80 mb-1">Last Name</label>
              <input type="text" defaultValue="Connors" className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium opacity-80 mb-1">Email Address</label>
              <input type="email" defaultValue="sarah@example.com" className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]" />
            </div>
          </div>
          <button className="px-6 py-2 bg-[var(--color-sf-primary)] text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-md shadow-[var(--color-sf-primary)]/20">
            Save Changes
          </button>
        </GlassCard>

        <GlassCard className="space-y-6">
          <h2 className="font-bold text-lg">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)] w-5 h-5" />
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-xs opacity-60">Receive updates on new products and promotions.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)] w-5 h-5" />
              <div>
                <p className="font-medium">Order Notifications</p>
                <p className="text-xs opacity-60">Receive SMS and email updates about your orders.</p>
              </div>
            </label>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 border-red-200">
          <h2 className="font-bold text-lg text-red-600">Danger Zone</h2>
          <p className="text-sm opacity-80">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors">
            Delete Account
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
