"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { Package, Truck, CheckCircle } from "lucide-react";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const steps = [
    { label: "Order Placed", date: "Oct 24, 10:00 AM", completed: true, icon: <Package size={16} /> },
    { label: "Processing", date: "Oct 24, 02:30 PM", completed: true, icon: <Package size={16} /> },
    { label: "Out for Delivery", date: "Oct 25, 08:15 AM", completed: true, icon: <Truck size={16} /> },
    { label: "Delivered", date: "Oct 25, 11:42 AM", completed: true, icon: <CheckCircle size={16} /> },
  ];

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-8">
      <div>
        <Link href="/account/orders" className="text-sm font-bold text-[var(--color-sf-primary)] hover:underline mb-4 inline-block">&larr; Back to Orders</Link>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Order #{params.id}</h1>
        <p className="opacity-70 mt-1">Placed on Oct 24, 2026</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <GlassCard>
            <h2 className="font-bold text-lg mb-6">Tracking Status</h2>
            
            <div className="relative pl-6 space-y-8">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[var(--color-sf-border)] z-0"></div>
              
              {steps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.completed ? 'bg-[var(--color-sf-primary)] text-white' : 'bg-white dark:bg-slate-900 border border-[var(--color-sf-border)] text-gray-400'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <p className={`font-bold ${step.completed ? 'text-[var(--color-sf-foreground)]' : 'text-gray-400'}`}>{step.label}</p>
                    <p className="text-xs opacity-60">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-[var(--color-sf-border)]">
              <Link href={`/support?query=order_${params.id}`} className="w-full py-3 bg-[var(--color-sf-primary)]/10 text-[var(--color-sf-primary)] rounded-lg font-bold hover:bg-[var(--color-sf-primary)]/20 transition-colors block text-center">
                Ask NexaBot about this order
              </Link>
            </div>
          </GlassCard>
          
          <GlassCard>
            <h2 className="font-bold text-lg mb-4">Items</h2>
            <div className="flex items-center gap-4 py-4 border-b border-[var(--color-sf-border)]">
              <div className="w-16 h-16 bg-white/40 dark:bg-slate-800/40 rounded flex items-center justify-center shrink-0">
                <span className="text-[10px] opacity-40">Img</span>
              </div>
              <div className="flex-1">
                <p className="font-bold">AeroPhone Pro</p>
                <p className="text-xs opacity-60">Qty: 1</p>
              </div>
              <p className="font-medium">₹29,999</p>
            </div>
          </GlassCard>
        </div>

        <aside className="w-full md:w-80 shrink-0 space-y-6">
          <GlassCard>
            <h2 className="font-bold text-lg mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span>₹29,999</span></div>
              <div className="flex justify-between"><span className="opacity-70">Shipping</span><span className="text-green-600">Free</span></div>
              <div className="flex justify-between"><span className="opacity-70">Tax (8%)</span><span>₹2,400</span></div>
              <hr className="border-[var(--color-sf-border)] my-2" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹32,399</span></div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <h2 className="font-bold text-lg mb-4">Shipping Address</h2>
            <p className="text-sm opacity-80 leading-relaxed">
              Aditya Kumar Singh<br/>
              123 Tech Park<br/>
              Mumbai, MH 400001
            </p>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}
