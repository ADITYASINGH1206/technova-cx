"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Star,
  X,
  ChevronDown,
} from "lucide-react";
import { products, categories, getAllBrands } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import type { ProductCategory } from "@/types/database";

const priceRanges = [
  { label: "Under ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 – ₹25,000", min: 10000, max: 25000 },
  { label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { label: "Over ₹1,00,000", min: 100000, max: Infinity },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as ProductCategory | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const allBrands = getAllBrands();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Brand
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Price
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default: // featured
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, selectedPriceRange, sortBy]);

  const activeFilters = [selectedCategory, selectedBrand, selectedPriceRange !== null ? priceRanges[selectedPriceRange].label : null].filter(Boolean);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSelectedPriceRange(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <div className="bg-surface-secondary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
            Shop
          </h1>
          <p className="text-text-secondary">
            {filteredProducts.length} products {selectedCategory ? `in ${selectedCategory}` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-text-primary transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                showFilters || activeFilters.length > 0
                  ? "border-brand-500 bg-brand-50 text-brand-600"
                  : "border-border-default text-text-secondary hover:border-brand-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-border-default bg-surface-primary text-sm text-text-secondary focus:border-brand-500 outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeFilters.map((filter) => (
              <span
                key={String(filter)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-600 text-xs font-medium"
              >
                {String(filter)}
                <button
                  onClick={() => {
                    if (filter === selectedCategory) setSelectedCategory(null);
                    else if (filter === selectedBrand) setSelectedBrand(null);
                    else setSelectedPriceRange(null);
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs text-text-tertiary hover:text-danger-500 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:block w-64 shrink-0"
            >
              <div className="sticky top-28 space-y-6">
                {/* Category */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === cat.name ? null : cat.name
                          )
                        }
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedCategory === cat.name
                            ? "bg-brand-50 text-brand-600 font-medium"
                            : "text-text-secondary hover:bg-surface-tertiary"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          {cat.name}
                        </span>
                        <span className="text-xs text-text-tertiary">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Brand</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() =>
                          setSelectedBrand(selectedBrand === brand ? null : brand)
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedBrand === brand
                            ? "bg-brand-50 text-brand-600 font-medium"
                            : "text-text-secondary hover:bg-surface-tertiary"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        onClick={() =>
                          setSelectedPriceRange(selectedPriceRange === i ? null : i)
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedPriceRange === i
                            ? "bg-brand-50 text-brand-600 font-medium"
                            : "text-text-secondary hover:bg-surface-tertiary"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No products found</h3>
                <p className="text-text-secondary mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl gradient-brand text-white text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="card-elevated block group overflow-hidden"
                    >
                      <div className="aspect-square bg-surface-tertiary relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                            {Math.round(
                              ((product.original_price - product.price) / product.original_price) * 100
                            )}% OFF
                          </div>
                        )}
                        {!product.in_stock && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="px-4 py-2 rounded-xl bg-black/70 text-white text-sm font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-text-tertiary font-medium uppercase tracking-wider">
                            {product.brand}
                          </p>
                          <p className="text-xs text-text-tertiary">{product.category}</p>
                        </div>
                        <h3 className="font-semibold text-text-primary mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-1.5 mb-3">
                          <Star className="w-3.5 h-3.5 fill-warning-400 text-warning-400" />
                          <span className="text-sm font-medium text-text-primary">
                            {product.rating}
                          </span>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
