"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Derive unique categories from our seed data
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
  );

  return (
    <div className="py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <GlassCard className="sticky top-32 space-y-6 p-6">
          <h2 className="font-bold text-lg text-[var(--color-sf-foreground)] border-b border-[var(--color-sf-border)] pb-2">Filters</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3 opacity-80 text-sm">Categories</h3>
              <div className="space-y-3 text-sm">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-[var(--color-sf-primary)] transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-[var(--color-sf-border)] text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)] h-4 w-4 bg-transparent"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-sf-border)] opacity-50 pointer-events-none">
              <h3 className="font-medium mb-2 opacity-80 text-sm">Price Range (Coming Soon)</h3>
              <input type="range" className="w-full accent-[var(--color-sf-primary)]" disabled />
              <div className="flex justify-between text-xs opacity-60 mt-1">
                <span>₹0</span>
                <span>₹2,00,000+</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </aside>

      {/* Product Grid */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">All Products</h1>
          <p className="text-sm opacity-60 bg-[var(--color-sf-glass)] px-3 py-1 rounded-full border border-[var(--color-sf-border)]">
            {filteredProducts.length} results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group outline-none">
              <GlassCard interactive className="h-full flex flex-col p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-[var(--color-sf-primary)]/10">
                <div className="w-full aspect-square bg-[var(--color-sf-background)]/50 rounded-xl overflow-hidden mb-4 relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550009158-9ebf6d1736eb?w=800&q=80';
                    }}
                  />
                  {!product.in_stock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-red-500/90 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider border border-red-400/50">
                        OUT OF STOCK
                      </span>
                    </div>
                  )}
                  {product.featured && product.in_stock && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-[var(--color-sf-primary)] text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider shadow-md">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col flex-1 px-1">
                  <p className="text-[11px] font-medium tracking-wider text-[var(--color-sf-primary)] opacity-80 mb-1 uppercase">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-[var(--color-sf-foreground)] leading-tight mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div className="flex flex-col">
                      {product.original_price && (
                        <span className="text-[11px] line-through opacity-50 mb-0.5">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                      <span className="font-bold text-lg text-[var(--color-sf-foreground)]">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-[var(--color-sf-glass)] border border-[var(--color-sf-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-sf-primary)]">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <GlassCard className="text-center py-20 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-sf-glass)] border border-[var(--color-sf-border)] mb-4 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[var(--color-sf-foreground)] mb-1">No products found</h3>
            <p className="text-sm opacity-60">Try selecting different categories.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
