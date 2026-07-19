"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";

export default function StorefrontHomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  return (
    <div className="py-12 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-sf-foreground)]"
        >
          Elevate Your Reality.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-[var(--color-sf-foreground)] opacity-80 max-w-2xl mx-auto"
        >
          Discover premium electronics meticulously engineered to bend the boundaries of what is possible.
        </motion.p>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Featured Products</h2>
          <Link href="/shop" className="text-[var(--color-sf-primary)] hover:underline font-medium">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group outline-none">
              <GlassCard interactive className="h-full flex flex-col p-5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-[var(--color-sf-primary)]/20 border-white/10">
                <div className="w-full aspect-square bg-[var(--color-sf-background)]/50 rounded-xl overflow-hidden mb-5 relative">
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
                  {product.in_stock && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-[var(--color-sf-primary)] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider shadow-md">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col flex-1 px-1 text-center items-center">
                  <h3 className="text-xl font-bold text-[var(--color-sf-foreground)] leading-tight mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm opacity-60 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="mt-auto pt-4 flex flex-col items-center gap-2 w-full">
                    <span className="font-bold text-xl text-[var(--color-sf-foreground)]">
                      {formatPrice(product.price)}
                    </span>
                    <button className="mt-2 w-full px-6 py-2.5 bg-[var(--color-sf-primary)] text-white rounded-full font-medium transition-all shadow-lg shadow-[var(--color-sf-primary)]/20 group-hover:bg-blue-500">
                      View Details
                    </button>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating NexaBot Chat Bubble */}
      <Link href="/support">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[var(--color-sf-primary)] text-white rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-sf-primary)]/40 z-50 cursor-pointer border border-white/20"
          aria-label="Open AI Support"
        >
          <span className="text-xl relative z-10">💬</span>
          {/* Notification dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--color-sf-background)]" />
        </motion.button>
      </Link>
    </div>
  );
}
