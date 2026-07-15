"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function StorefrontHomePage() {
  return (
    <div className="py-12 space-y-16">
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard interactive className="flex flex-col items-center text-center space-y-4">
          <div className="w-full h-48 bg-white/40 rounded-xl overflow-hidden flex items-center justify-center">
            {/* Placeholder for image */}
            <span className="opacity-40 font-medium">AeroPhone Pro</span>
          </div>
          <h3 className="text-xl font-bold">AeroPhone Pro</h3>
          <p className="opacity-80 text-sm">Matte Silver Edition.</p>
          <button className="px-6 py-2 bg-[var(--color-sf-primary)] text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg shadow-[var(--color-sf-primary)]/20">
            View Details
          </button>
        </GlassCard>

        <GlassCard interactive className="flex flex-col items-center text-center space-y-4">
          <div className="w-full h-48 bg-white/40 rounded-xl overflow-hidden flex items-center justify-center">
            <span className="opacity-40 font-medium">Nova Watch Series 4</span>
          </div>
          <h3 className="text-xl font-bold">Nova Watch Series 4</h3>
          <p className="opacity-80 text-sm">Graphite titanium.</p>
          <button className="px-6 py-2 bg-[var(--color-sf-primary)] text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg shadow-[var(--color-sf-primary)]/20">
            View Details
          </button>
        </GlassCard>

        <GlassCard interactive className="flex flex-col items-center text-center space-y-4">
          <div className="w-full h-48 bg-white/40 rounded-xl overflow-hidden flex items-center justify-center">
            <span className="opacity-40 font-medium">OmniCharge Pad</span>
          </div>
          <h3 className="text-xl font-bold">OmniCharge Pad</h3>
          <p className="opacity-80 text-sm">Ceramic White.</p>
          <button className="px-6 py-2 bg-[var(--color-sf-primary)] text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg shadow-[var(--color-sf-primary)]/20">
            View Details
          </button>
        </GlassCard>
      </section>

      {/* Floating NexaBot Chat Bubble */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[var(--color-sf-primary)] text-white rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-sf-primary)]/40 z-50"
      >
        💬
      </motion.button>
    </div>
  );
}
