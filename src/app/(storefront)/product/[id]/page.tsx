"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";
import { useState, use } from "react";
import { products } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  // Handle Next.js 15+ params promise if needed, or fallback to direct object access
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const id = unwrappedParams.id;
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return notFound();
  }

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      // For demo purposes, pick a generic property
      color: "Standard"
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12 flex flex-col lg:flex-row gap-12">
      {/* Product Imagery */}
      <div className="flex-1 space-y-6">
        <GlassCard className="w-full aspect-[4/3] flex items-center justify-center p-0 overflow-hidden relative border-white/10">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550009158-9ebf6d1736eb?w=800&q=80';
            }}
          />
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-red-500/90 text-white text-lg font-bold px-6 py-2 rounded-full tracking-widest border border-red-400/50 shadow-2xl shadow-red-500/20">
                OUT OF STOCK
              </span>
            </div>
          )}
        </GlassCard>
        
        {/* Placeholder thumbnails for demo */}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((thumb) => (
            <GlassCard interactive key={thumb} className="aspect-square flex items-center justify-center p-0 overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
              <img
                src={product.image_url}
                alt={`${product.name} view ${thumb}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Product Configuration */}
      <aside className="w-full lg:w-96 shrink-0">
        <GlassCard className="sticky top-32 flex flex-col gap-6 p-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-sf-glass)] border border-[var(--color-sf-border)] text-[var(--color-sf-primary)] text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              {product.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-sf-primary)] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">{product.name}</h1>
            
            <div className="flex items-center gap-4 mt-3 mb-1">
              <div className="flex text-amber-400 text-sm">
                {'★'.repeat(Math.round(product.rating))}
                <span className="text-slate-500">{'★'.repeat(5 - Math.round(product.rating))}</span>
              </div>
              <span className="text-xs font-medium opacity-60">{product.rating} ({product.review_count} reviews)</span>
            </div>
            
            <p className="text-sm opacity-70 mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col">
            {product.original_price && (
              <span className="text-sm line-through opacity-50 mb-1">
                {formatPrice(product.original_price)}
              </span>
            )}
            <div className="text-4xl font-bold tracking-tight text-[var(--color-sf-foreground)]">
              {formatPrice(product.price)}
            </div>
          </div>

          <hr className="border-[var(--color-sf-border)]" />

          {/* Config Options */}
          {product.specs && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">Specifications</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(product.specs).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="flex flex-col bg-[var(--color-sf-background)]/50 p-3 rounded-lg border border-[var(--color-sf-border)]">
                    <span className="opacity-50 text-[10px] uppercase tracking-wider">{key}</span>
                    <span className="font-medium mt-1">{value as React.ReactNode}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={handleAddToCart}
            disabled={added || !product.in_stock}
            className={`w-full py-4 mt-4 text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[var(--color-sf-primary)]/30 ${
              !product.in_stock ? 'bg-slate-700 cursor-not-allowed opacity-50 shadow-none' : 
              added ? 'bg-emerald-500 shadow-emerald-500/30' : 
              'bg-[var(--color-sf-primary)]'
            }`}
          >
            {!product.in_stock ? "Out of Stock" : added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
          
          <p className="text-center text-xs opacity-60 mt-2">
            Free shipping and 14-day returns.
          </p>
        </GlassCard>
      </aside>
    </div>
  );
}
