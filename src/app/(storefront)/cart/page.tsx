"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Tag, ShoppingBag } from "lucide-react";
import { products } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types/database";

// Demo cart items
const initialCart: CartItem[] = [
  { product: products[0], quantity: 1 },  // ProBook X16
  { product: products[14], quantity: 1 }, // AuraMax Pro
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const handlePromo = () => {
    if (promoCode.toLowerCase() === "technova10") {
      setPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ShoppingBag className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Your cart is empty</h2>
          <p className="text-text-secondary mb-6">Looks like you haven&apos;t added anything yet</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-medium"
          >
            Browse Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="bg-surface-secondary border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-display font-bold text-text-primary flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-brand-500" />
            Shopping Cart
            <span className="text-lg text-text-tertiary font-normal">({cartItems.length} items)</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, i) => {
              const emoji =
                item.product.category === "Laptops" ? "💻" :
                item.product.category === "Phones" ? "📱" :
                item.product.category === "Headphones" ? "🎧" : "⌚";

              return (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-elevated p-4 flex gap-4"
                >
                  <div className="w-24 h-24 rounded-xl bg-surface-tertiary flex items-center justify-center shrink-0">
                    <span className="text-4xl">{emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-text-tertiary font-medium uppercase tracking-wider">
                          {item.product.brand}
                        </p>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="font-semibold text-text-primary hover:text-brand-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 rounded-lg text-text-tertiary hover:text-danger-500 hover:bg-danger-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-border-default rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-2 text-text-tertiary hover:text-text-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-text-primary">{formatPrice(item.product.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-text-tertiary">{formatPrice(item.product.price)} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div>
            <div className="card-elevated p-6 sticky top-28">
              <h2 className="font-semibold text-text-primary mb-4">Order Summary</h2>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm"
                    disabled={promoApplied}
                  />
                </div>
                <button
                  onClick={handlePromo}
                  disabled={promoApplied || !promoCode}
                  className="px-4 py-2.5 rounded-lg border border-brand-500 text-brand-600 text-sm font-medium hover:bg-brand-50 disabled:opacity-50 transition-all"
                >
                  {promoApplied ? "Applied ✓" : "Apply"}
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-success-600 mb-4">🎉 TECHNOVA10: 10% discount applied!</p>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-text-primary font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="text-text-primary font-medium">
                    {shipping === 0 ? (
                      <span className="text-success-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <hr className="border-border-subtle" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-text-primary">Total</span>
                  <span className="font-bold text-text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-brand text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="mt-4 text-xs text-text-tertiary text-center">
                Try code <span className="font-mono font-semibold">TECHNOVA10</span> for 10% off
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
