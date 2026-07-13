"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CreditCard,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Package,
  ChevronRight,
} from "lucide-react";
import { products } from "@/lib/seed-data";
import { formatPrice } from "@/lib/utils";

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Demo data
  const cartItems = [
    { product: products[0], quantity: 1 },
    { product: products[14], quantity: 1 },
  ];
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const total = subtotal;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-success-500 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-text-secondary mb-2">
            Your order <span className="font-mono font-semibold">ORD-{Math.floor(7749 + Math.random() * 100)}</span> has been placed successfully.
          </p>
          <p className="text-sm text-text-tertiary mb-8">
            You&apos;ll receive a confirmation email shortly with tracking details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/account/dashboard"
              className="px-6 py-3 rounded-xl gradient-brand text-white font-medium shadow-lg"
            >
              Track Order
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl border border-border-default text-text-secondary font-medium hover:border-brand-300"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="bg-surface-secondary border-b border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-display font-bold text-text-primary mb-6">Checkout</h1>

          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    i <= currentStep
                      ? "gradient-brand text-white shadow-md"
                      : "bg-surface-tertiary text-text-tertiary"
                  }`}
                >
                  {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-sm font-medium ${
                    i <= currentStep ? "text-brand-600" : "text-text-tertiary"
                  }`}
                >
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full ${i < currentStep ? "bg-brand-500" : "bg-surface-tertiary"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Shipping */}
          {currentStep === 0 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card-elevated p-6"
            >
              <h2 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-500" /> Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-1.5 block">First Name</label>
                    <input defaultValue="Ananya" className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-1.5 block">Last Name</label>
                    <input defaultValue="Sharma" className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">Address</label>
                  <input defaultValue="42 MG Road" className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-1.5 block">City</label>
                    <input defaultValue="Bengaluru" className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-1.5 block">State</label>
                    <input defaultValue="Karnataka" className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-primary mb-1.5 block">PIN Code</label>
                    <input defaultValue="560001" className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary mb-1.5 block">Phone</label>
                  <input defaultValue="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border-default focus:border-brand-500 outline-none text-sm" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-medium shadow-lg hover:shadow-xl"
                >
                  Continue to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 1 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card-elevated p-6"
            >
              <h2 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-500" /> Payment Method
              </h2>
              <div className="space-y-3">
                {["UPI (Google Pay / PhonePe / Paytm)", "Credit / Debit Card", "Net Banking", "EMI", "Cash on Delivery"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border-default hover:border-brand-300 cursor-pointer transition-all"
                  >
                    <input type="radio" name="payment" defaultChecked={method.includes("UPI")} className="accent-brand-500" />
                    <span className="text-sm text-text-primary">{method}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-success-500/10 flex items-center gap-2 text-success-600 text-xs">
                <ShieldCheck className="w-4 h-4" />
                Your payment is secured with 256-bit encryption
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-secondary font-medium hover:border-brand-300"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-medium shadow-lg hover:shadow-xl"
                >
                  Review Order <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 2 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="card-elevated p-6">
                <h2 className="font-semibold text-text-primary mb-4">Order Review</h2>
                <div className="divide-y divide-border-subtle">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{item.product.name}</p>
                        <p className="text-xs text-text-tertiary">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-text-primary">{formatPrice(item.product.price)}</p>
                    </div>
                  ))}
                </div>
                <hr className="my-3 border-border-subtle" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold gradient-text">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-secondary font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-brand text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <Package className="w-5 h-5" />
                  Place Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
