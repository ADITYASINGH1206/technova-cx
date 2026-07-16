"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";
import { useState } from "react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: "nova-book-pro-x15",
      name: "NovaBook Pro X15",
      price: 2499,
      color: "Space Gray"
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12 flex flex-col lg:flex-row gap-12">
      {/* Product Imagery */}
      <div className="flex-1 space-y-6">
        <GlassCard className="w-full aspect-[4/3] flex items-center justify-center p-0 overflow-hidden">
          <div className="w-full h-full bg-white/30 flex items-center justify-center">
            <span className="text-2xl font-bold opacity-30">Main Product View</span>
          </div>
        </GlassCard>
        
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((thumb) => (
            <GlassCard interactive key={thumb} className="aspect-square flex items-center justify-center p-0 overflow-hidden">
              <div className="w-full h-full bg-white/30 flex items-center justify-center">
                <span className="text-sm font-bold opacity-30">View {thumb}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Product Configuration */}
      <aside className="w-full lg:w-96 shrink-0">
        <GlassCard className="sticky top-32 flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-[var(--color-sf-primary)]/10 text-[var(--color-sf-primary)] text-xs font-bold uppercase tracking-wider mb-3">
              New Release
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">NovaBook Pro X15</h1>
            <p className="text-sm opacity-70 mt-2 leading-relaxed">
              The ultimate machine for visionary creators and demanding professionals. Engineered for unprecedented performance.
            </p>
          </div>

          <div className="text-3xl font-bold tracking-tight">
            $2,499.00
          </div>

          <hr className="border-[var(--color-sf-border)]" />

          {/* Config Options */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">Processor</h3>
              <div className="grid grid-cols-1 gap-2">
                <button className="p-3 text-left rounded-lg border-2 border-[var(--color-sf-primary)] bg-[var(--color-sf-primary)]/5 font-medium transition-colors">
                  M3 Pro (12-core)
                </button>
                <button className="p-3 text-left rounded-lg border border-[var(--color-sf-border)] hover:border-[var(--color-sf-primary)]/50 font-medium transition-colors flex justify-between">
                  <span>M3 Max (16-core)</span>
                  <span className="opacity-60">+$400</span>
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-4 mt-4 text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[var(--color-sf-primary)]/30 ${added ? 'bg-green-500' : 'bg-[var(--color-sf-primary)]'}`}
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
          
          <p className="text-center text-xs opacity-60">
            Free shipping and 14-day returns.
          </p>
        </GlassCard>
      </aside>
    </div>
  );
}
