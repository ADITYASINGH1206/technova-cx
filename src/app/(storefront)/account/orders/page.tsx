"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

export default function AccountOrdersPage() {
  const orders = [
    {
      id: "8492-22",
      date: "Oct 24, 2024",
      status: "Delivered",
      total: 299.00,
      items: [{ name: "AeroPhone Pro", qty: 1 }]
    },
    {
      id: "8111-99",
      date: "Sep 12, 2024",
      status: "Returned",
      total: 1299.00,
      items: [{ name: "NovaBook X15", qty: 1 }]
    },
    {
      id: "7554-12",
      date: "Aug 05, 2024",
      status: "Delivered",
      total: 89.00,
      items: [{ name: "OmniCharge Pad", qty: 1 }]
    }
  ];

  return (
    <div className="py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <GlassCard className="sticky top-32 space-y-4">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link href="/account/dashboard" className="px-4 py-2 hover:bg-white/50 rounded-lg transition-colors">Dashboard</Link>
            <Link href="/account/orders" className="px-4 py-2 bg-[var(--color-sf-primary)]/10 text-[var(--color-sf-primary)] rounded-lg">Order History</Link>
            <Link href="/account/settings" className="px-4 py-2 hover:bg-white/50 rounded-lg transition-colors">Settings</Link>
          </nav>
        </GlassCard>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Order History</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <GlassCard key={order.id} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold">Order #{order.id}</h3>
                  <p className="text-xs opacity-60">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <hr className="border-[var(--color-sf-border)] my-4" />
              
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/40 rounded flex shrink-0 items-center justify-center">
                      <span className="text-[10px] opacity-40">Img</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs opacity-60">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-4">
                <button className="px-4 py-2 bg-white/60 text-sm font-bold rounded-lg hover:bg-white transition-colors border border-[var(--color-sf-border)]">
                  Track Package
                </button>
                <button className="px-4 py-2 text-sm font-bold text-[var(--color-sf-primary)] hover:underline">
                  View Invoice
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
