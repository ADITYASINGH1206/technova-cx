"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export default function CheckoutPage() {
  return (
    <div className="py-12 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Checkout</h1>
        
        <GlassCard className="space-y-6">
          <h2 className="font-bold text-lg">Contact Information</h2>
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-white/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
          />
          
          <h2 className="font-bold text-lg pt-4 border-t border-[var(--color-sf-border)]">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full bg-white/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-full bg-white/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
            <input 
              type="text" 
              placeholder="Address" 
              className="col-span-2 w-full bg-white/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
            <input 
              type="text" 
              placeholder="City" 
              className="w-full bg-white/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
            <input 
              type="text" 
              placeholder="Postal Code" 
              className="w-full bg-white/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
          </div>

          <h2 className="font-bold text-lg pt-4 border-t border-[var(--color-sf-border)]">Payment Method</h2>
          <div className="space-y-4">
            <div className="bg-white/50 border border-[var(--color-sf-border)] rounded-lg p-4 flex items-center gap-3">
              <input type="radio" name="payment" defaultChecked className="text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)]" />
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="bg-white/50 border border-[var(--color-sf-border)] rounded-lg p-4 flex items-center gap-3">
              <input type="radio" name="payment" className="text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)]" />
              <span className="font-medium">PayPal</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <aside className="w-full md:w-96 shrink-0">
        <GlassCard className="sticky top-32 space-y-6 bg-white/40">
          <h2 className="font-bold text-lg">In your bag</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-white/60 rounded-md"></div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">AeroPhone Pro</h4>
                <p className="text-xs opacity-60">Qty: 1</p>
                <p className="font-bold text-sm mt-1">$299.00</p>
              </div>
            </div>
          </div>

          <hr className="border-[var(--color-sf-border)]" />
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span className="font-medium">$299.00</span></div>
            <div className="flex justify-between"><span className="opacity-70">Shipping</span><span className="font-medium">Free</span></div>
            <div className="flex justify-between"><span className="opacity-70">Taxes</span><span className="font-medium">$24.00</span></div>
          </div>

          <hr className="border-[var(--color-sf-border)]" />

          <div className="flex justify-between items-end">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-bold">$323.00</span>
          </div>

          <button className="w-full py-4 bg-[var(--color-sf-primary)] text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[var(--color-sf-primary)]/30">
            Complete Order
          </button>
        </GlassCard>
      </aside>
    </div>
  );
}
