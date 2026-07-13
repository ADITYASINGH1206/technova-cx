"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Star,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { products, categories, getFeaturedProducts } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-hero">
        {/* Background mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-brand-300/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-[15%] w-96 h-96 bg-accent-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-20 left-[30%] w-80 h-80 bg-brand-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-brand-700 mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Customer Care
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary leading-tight mb-6 text-balance"
              >
                Premium Tech,{" "}
                <span className="gradient-text">Trusted</span>{" "}
                Support
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-xl text-pretty"
              >
                Every answer fact-checked by AI. Every claim backed by a citation.
                Meet NexaBot — the support assistant that shows its work.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-brand text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                >
                  Browse Shop
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass text-text-primary font-semibold text-base hover:bg-white/90 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-brand-500" />
                  Try NexaBot
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 flex flex-wrap items-center gap-6 text-sm text-text-secondary"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success-500" />
                  Fact-checked answers
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success-500" />
                  Transparent citations
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning-500" />
                  Instant responses
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Mock chat window */}
                <div className="glass-strong rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">NexaBot</p>
                      <p className="text-xs text-success-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block" />
                        Online
                      </p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-brand-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[80%]">
                        My earbuds stopped charging. Still under warranty?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-surface-tertiary px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[85%] text-text-primary">
                        <p>Great news! Your TechNova BudsAir 3 from order <strong>ORD-7740</strong> is covered under warranty until <strong>Dec 2026</strong>. 🎉</p>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-brand-600">
                          <Shield className="w-3 h-3" />
                          Grounded in: Warranty & Repairs Policy v2
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-success-500/10 border border-success-500/20 px-3 py-2 rounded-xl text-xs text-success-600 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified by Critic Agent · Confidence: 0.94
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stat cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass-strong rounded-2xl px-4 py-3 shadow-lg"
                >
                  <p className="text-xs text-text-secondary">Deflection Rate</p>
                  <p className="text-2xl font-bold gradient-text">87%</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-6 glass-strong rounded-2xl px-4 py-3 shadow-lg"
                >
                  <p className="text-xs text-text-secondary">Hallucinations Blocked</p>
                  <p className="text-2xl font-bold text-danger-500">0</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-24 bg-surface-primary mesh-bg">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4"
            >
              Shop by Category
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              Discover our curated collection of premium electronics
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Link
                  href={`/shop?category=${cat.name}`}
                  className="card-glass glass block p-6 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-tertiary">{cat.count} products</span>
                    <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-24 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2"
              >
                Trending Tech
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-text-secondary text-lg">
                Our most popular picks
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {featuredProducts.slice(0, 8).map((product) => (
              <motion.div key={product.id} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <Link href={`/product/${product.id}`} className="card-elevated block group overflow-hidden">
                  {/* Image placeholder */}
                  <div className="aspect-square bg-surface-tertiary relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">
                        {product.category === "Laptops"
                          ? "💻"
                          : product.category === "Phones"
                          ? "📱"
                          : product.category === "Headphones"
                          ? "🎧"
                          : "⌚"}
                      </span>
                    </div>
                    {product.original_price && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-danger-500 text-white text-xs font-semibold">
                        {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-text-tertiary font-medium uppercase tracking-wider mb-1">
                      {product.brand}
                    </p>
                    <h3 className="font-semibold text-text-primary mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" />
                        <span className="text-sm font-medium text-text-primary">{product.rating}</span>
                      </div>
                      <span className="text-xs text-text-tertiary">
                        ({product.review_count.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-text-tertiary line-through">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-brand-600 font-medium"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== NEXABOT TRUST SECTION ==================== */}
      <section className="py-24 bg-surface-primary mesh-bg">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-brand-700 mb-6"
            >
              <Shield className="w-4 h-4" />
              Trust-First AI
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4"
            >
              Meet <span className="gradient-text">NexaBot</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              The AI support assistant that proves every answer before you see it
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <MessageCircle className="w-6 h-6" />,
                title: "Grounded Answers",
                description: "Every claim traces back to a real database lookup or a specific policy document. Never hallucinated, always verifiable.",
                gradient: "from-brand-500 to-brand-600",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Silent Fact-Checker",
                description: "A second AI model silently verifies every response before you see it. If confidence drops below 0.6, a human takes over.",
                gradient: "from-accent-500 to-accent-600",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Transparent Citations",
                description: "Every answer comes with clickable citation chips linking to the exact policy clause used. Inspect the source yourself.",
                gradient: "from-success-500 to-success-600",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="card-glass glass p-8 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mx-auto mb-5`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/support"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-brand text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with NexaBot
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="py-16 gradient-brand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: "25+", label: "Premium Products" },
              { value: "87%", label: "AI Deflection Rate" },
              { value: "0.91", label: "Avg. Confidence Score" },
              { value: "< 5s", label: "Response Time" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-3xl md:text-4xl font-display font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
