"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-12 max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Your Cart is Empty</h1>
        <p className="opacity-70">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/shop" className="inline-block px-6 py-3 bg-[var(--color-sf-primary)] text-white rounded-xl font-bold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-[var(--color-sf-foreground)]">Your Cart</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {/* Cart Items */}
          {items.map((item) => (
            <GlassCard key={item.id} className="flex items-center gap-6 p-4">
              <div className="w-24 h-24 bg-white/40 dark:bg-slate-800/40 rounded-lg shrink-0 flex items-center justify-center">
                <span className="opacity-40 text-xs font-bold text-center">Product<br/>Image</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm opacity-60">{item.color || "Standard"}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center border border-[var(--color-sf-border)] rounded-full px-2 py-1 bg-white/50 dark:bg-slate-800/50">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 opacity-60 hover:opacity-100"
                    >-</button>
                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 opacity-60 hover:opacity-100"
                    >+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm hover:underline font-medium">Remove</button>
                </div>
              </div>
              <div className="text-lg font-bold">
                ₹{(item.price * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </GlassCard>
          ))}
        </div>

        <aside className="w-full md:w-80 shrink-0">
          <GlassCard className="sticky top-32 flex flex-col gap-4">
            <h2 className="font-bold text-lg mb-2">Order Summary</h2>
            
            <div className="flex justify-between text-sm">
              <span className="opacity-70">Subtotal</span>
              <span className="font-medium">₹{totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-70">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            
            <hr className="border-[var(--color-sf-border)] my-2" />
            
            <div className="flex justify-between items-end">
              <span className="font-bold text-lg">Total</span>
              <span className="text-2xl font-bold">₹{totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
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
