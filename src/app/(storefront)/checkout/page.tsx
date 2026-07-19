"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { useCart } from "@/components/providers/CartProvider";
import { useState } from "react";
import Link from "next/link";
import { processCheckout } from "@/app/actions/checkout";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + tax;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Generate Order ID
      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // 2. Call secure Server Action
      const result = await processCheckout(orderId, items, finalTotal, totalPrice, tax);

      if (!result.success) {
        throw new Error(result.error);
      }

      // 3. Success State
      clearCart();
      setSuccessOrderId(orderId);
      
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successOrderId) {
    return (
      <div className="py-24 max-w-2xl mx-auto text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
          ✓
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-sf-foreground)] mb-2">Order Confirmed!</h1>
          <p className="opacity-70 text-lg">Thank you for your purchase.</p>
        </div>
        <GlassCard className="inline-block px-12 py-6">
          <p className="text-sm font-bold opacity-70 uppercase tracking-wider mb-1">Order Number</p>
          <p className="text-2xl font-mono">{successOrderId}</p>
        </GlassCard>
        <div className="pt-4 flex gap-4 justify-center">
          <Link href="/shop" className="px-6 py-3 bg-[var(--color-sf-primary)] text-white rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-[var(--color-sf-primary)]/30">
            Continue Shopping
          </Link>
          <Link href={`/account/orders/${successOrderId}`} className="px-6 py-3 bg-white/50 dark:bg-slate-800/50 text-[var(--color-sf-foreground)] border border-[var(--color-sf-border)] rounded-xl font-bold hover:bg-white/80 transition-colors">
            View Order
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your bag is empty.</h1>
        <Link href="/shop" className="text-[var(--color-sf-primary)] font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Checkout</h1>
        
        <form id="checkout-form" onSubmit={handleCheckout}>
          <GlassCard className="space-y-6">
            <h2 className="font-bold text-lg">Contact Information</h2>
            <input 
              type="email" 
              required
              placeholder="Email Address" 
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
            />
            
            <h2 className="font-bold text-lg pt-4 border-t border-[var(--color-sf-border)]">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                required
                placeholder="First Name" 
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
              />
              <input 
                type="text" 
                required
                placeholder="Last Name" 
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
              />
              <input 
                type="text" 
                required
                placeholder="Address" 
                className="col-span-2 w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
              />
              <input 
                type="text" 
                required
                placeholder="City" 
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
              />
              <input 
                type="text" 
                required
                placeholder="Postal Code" 
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-sf-primary)]"
              />
            </div>

            <h2 className="font-bold text-lg pt-4 border-t border-[var(--color-sf-border)]">Payment Method</h2>
            <div className="space-y-4">
              <div className="bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg p-4 flex items-center gap-3">
                <input type="radio" name="payment" defaultChecked className="text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)]" />
                <span className="font-medium">Credit Card</span>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 border border-[var(--color-sf-border)] rounded-lg p-4 flex items-center gap-3">
                <input type="radio" name="payment" className="text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)]" />
                <span className="font-medium">UPI / Netbanking</span>
              </div>
            </div>
          </GlassCard>
        </form>
      </div>

      <aside className="w-full md:w-96 shrink-0">
        <GlassCard className="sticky top-32 space-y-6 bg-white/40 dark:bg-slate-800/40">
          <h2 className="font-bold text-lg">In your bag</h2>
          
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-white/60 dark:bg-slate-800/60 rounded-md shrink-0 flex items-center justify-center text-[10px] opacity-40 font-bold">Img</div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                  <p className="text-xs opacity-60">Qty: {item.quantity}</p>
                  <p className="font-bold text-sm mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-[var(--color-sf-border)]" />
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span className="font-medium">₹{totalPrice.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="opacity-70">Shipping</span><span className="font-medium text-green-600">Free</span></div>
            <div className="flex justify-between"><span className="opacity-70">Taxes (8%)</span><span className="font-medium">₹{tax.toLocaleString('en-IN')}</span></div>
          </div>

          <hr className="border-[var(--color-sf-border)]" />

          <div className="flex justify-between items-end">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>

          <button 
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full py-4 bg-[var(--color-sf-primary)] text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[var(--color-sf-primary)]/30 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? "Processing..." : "Complete Order"}
          </button>
        </GlassCard>
      </aside>
    </div>
  );
}
