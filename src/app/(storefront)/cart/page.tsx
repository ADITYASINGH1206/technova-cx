"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-[var(--color-sf-foreground)]">Your Cart</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {/* Cart Items */}
          {[1, 2].map((item) => (
            <GlassCard key={item} className="flex items-center gap-6 p-4">
              <div className="w-24 h-24 bg-white/40 rounded-lg shrink-0 flex items-center justify-center">
                <span className="opacity-40 text-xs font-bold">Image</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold">AeroPhone Pro</h3>
                <p className="text-sm opacity-60">Matte Silver</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border border-[var(--color-sf-border)] rounded-full px-2 py-1">
                    <button className="px-2 opacity-60 hover:opacity-100">-</button>
                    <span className="px-2 text-sm font-medium">1</span>
                    <button className="px-2 opacity-60 hover:opacity-100">+</button>
                  </div>
                  <button className="text-red-500 text-sm hover:underline">Remove</button>
                </div>
              </div>
              <div className="text-lg font-bold">
                $299.00
              </div>
            </GlassCard>
          ))}
        </div>

        <aside className="w-full md:w-80 shrink-0">
          <GlassCard className="sticky top-32 flex flex-col gap-4">
            <h2 className="font-bold text-lg mb-2">Order Summary</h2>
            
            <div className="flex justify-between text-sm">
              <span className="opacity-70">Subtotal</span>
              <span className="font-medium">$598.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-70">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            
            <hr className="border-[var(--color-sf-border)] my-2" />
            
            <div className="flex justify-between items-end">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold">$598.00</span>
            </div>

            <Link href="/checkout" className="w-full mt-6 py-4 bg-[var(--color-sf-primary)] text-white text-center rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[var(--color-sf-primary)]/30 block">
              Proceed to Checkout
            </Link>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}
