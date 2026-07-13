"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Shield,
  Truck,
  RotateCcw,
  MessageCircle,
  ChevronRight,
  Check,
} from "lucide-react";
import { getProductById, getProductsByCategory } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const emoji =
    product.category === "Laptops"
      ? "💻"
      : product.category === "Phones"
      ? "📱"
      : product.category === "Headphones"
      ? "🎧"
      : "⌚";

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Breadcrumb */}
      <div className="bg-surface-secondary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-tertiary">
            <Link href="/shop" className="hover:text-brand-600 transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-brand-600 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-text-primary font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square bg-surface-tertiary rounded-3xl flex items-center justify-center relative overflow-hidden sticky top-28">
              <span className="text-[120px] md:text-[160px]">{emoji}</span>

              {product.original_price && (
                <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-danger-500 text-white text-sm font-semibold">
                  {Math.round(
                    ((product.original_price - product.price) / product.original_price) * 100
                  )}% OFF
                </div>
              )}

              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-danger-500 transition-colors shadow-md"
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-sm font-medium text-brand-600 uppercase tracking-wider mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-warning-400 text-warning-400"
                        : "text-border-default"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-text-primary">{product.rating}</span>
              <span className="text-sm text-text-tertiary">
                ({product.review_count.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.original_price && (
                <>
                  <span className="text-lg text-text-tertiary line-through">
                    {formatPrice(product.original_price)}
                  </span>
                  <span className="text-sm font-semibold text-success-600">
                    Save {formatPrice(product.original_price - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-8">
              {product.in_stock ? (
                <>
                  <Check className="w-4 h-4 text-success-500" />
                  <span className="text-sm font-medium text-success-600">In Stock</span>
                </>
              ) : (
                <span className="text-sm font-medium text-danger-500">Out of Stock</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all ${
                  product.in_stock
                    ? "gradient-brand text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    : "bg-surface-tertiary text-text-tertiary cursor-not-allowed"
                }`}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.in_stock ? "Add to Cart" : "Unavailable"}
              </button>
              <button className="px-4 py-4 rounded-2xl border border-border-default text-text-secondary hover:border-brand-300 hover:text-brand-600 transition-all">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: <Truck className="w-5 h-5" />, label: "Free Shipping", sub: "Orders over ₹999" },
                { icon: <RotateCcw className="w-5 h-5" />, label: "Easy Returns", sub: "7-day window" },
                { icon: <Shield className="w-5 h-5" />, label: "Warranty", sub: product.category === "Headphones" ? "6 months" : "12 months" },
              ].map((badge) => (
                <div key={badge.label} className="text-center p-3 rounded-xl bg-surface-secondary">
                  <div className="flex justify-center text-brand-500 mb-1.5">{badge.icon}</div>
                  <p className="text-xs font-semibold text-text-primary">{badge.label}</p>
                  <p className="text-xs text-text-tertiary">{badge.sub}</p>
                </div>
              ))}
            </div>

            {/* Specs Table */}
            <div className="border border-border-subtle rounded-2xl overflow-hidden">
              <div className="px-4 py-3 bg-surface-secondary border-b border-border-subtle">
                <h3 className="font-semibold text-text-primary text-sm">Specifications</h3>
              </div>
              <div className="divide-y divide-border-subtle">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center px-4 py-3">
                    <span className="w-1/3 text-sm text-text-tertiary">{key}</span>
                    <span className="flex-1 text-sm text-text-primary font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NexaBot CTA */}
            <div className="mt-8 p-4 rounded-2xl bg-brand-50 border border-brand-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">
                    Have questions about this product?
                  </p>
                  <p className="text-xs text-text-secondary mb-2">
                    Ask NexaBot about warranty, returns, or support for this item.
                  </p>
                  <Link
                    href="/support"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Chat with NexaBot <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-8">
              More in {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/product/${rp.id}`} className="card-elevated block group overflow-hidden">
                  <div className="aspect-square bg-surface-tertiary flex items-center justify-center">
                    <span className="text-5xl">{emoji}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-tertiary font-medium uppercase tracking-wider mb-1">{rp.brand}</p>
                    <h3 className="font-semibold text-text-primary mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">{rp.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-primary">{formatPrice(rp.price)}</span>
                      {rp.original_price && (
                        <span className="text-sm text-text-tertiary line-through">{formatPrice(rp.original_price)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
