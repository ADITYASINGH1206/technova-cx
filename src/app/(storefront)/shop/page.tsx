"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ShopPage() {
  const products = [
    { id: 1, name: "AeroPhone Pro", category: "Smartphones", price: "$999" },
    { id: 2, name: "Nova Watch Series 4", category: "Wearables", price: "$499" },
    { id: 3, name: "OmniCharge Pad", category: "Accessories", price: "$89" },
    { id: 4, name: "AeroEarbuds", category: "Audio", price: "$249" },
    { id: 5, name: "NovaBook X15", category: "Laptops", price: "$1899" },
    { id: 6, name: "SmartHome Hub", category: "Smart Home", price: "$149" },
  ];

  return (
    <div className="py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <GlassCard className="sticky top-32 space-y-6">
          <h2 className="font-bold text-lg text-[var(--color-sf-foreground)] border-b border-[var(--color-sf-border)] pb-2">Filters</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2 opacity-80 text-sm">Categories</h3>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-sf-primary)]">
                  <input type="checkbox" className="rounded border-gray-300 text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)]" />
                  Smartphones
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-sf-primary)]">
                  <input type="checkbox" className="rounded border-gray-300 text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)]" />
                  Wearables
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-sf-primary)]">
                  <input type="checkbox" className="rounded border-gray-300 text-[var(--color-sf-primary)] focus:ring-[var(--color-sf-primary)]" />
                  Accessories
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2 opacity-80 text-sm">Price Range</h3>
              <input type="range" className="w-full accent-[var(--color-sf-primary)]" />
              <div className="flex justify-between text-xs opacity-60 mt-1">
                <span>$0</span>
                <span>$2000+</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </aside>

      {/* Product Grid */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">All Products</h1>
          <select className="bg-transparent border border-[var(--color-sf-border)] rounded-md px-3 py-1 text-sm focus:ring-[var(--color-sf-primary)]">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <GlassCard interactive className="h-full flex flex-col items-center text-center p-4">
                <div className="w-full aspect-square bg-white/40 rounded-xl overflow-hidden flex items-center justify-center mb-4">
                  <span className="opacity-40 font-medium text-sm">{product.name} Preview</span>
                </div>
                <h3 className="font-bold text-[var(--color-sf-foreground)]">{product.name}</h3>
                <p className="text-xs opacity-60 mb-3">{product.category}</p>
                <div className="mt-auto font-medium text-lg">{product.price}</div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
