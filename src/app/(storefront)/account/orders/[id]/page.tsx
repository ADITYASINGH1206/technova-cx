"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  MessageCircle,
  ChevronRight,
  Copy,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { getOrderById } from "@/lib/seed-data";
import { formatPrice, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

const statusSteps = [
  { key: "Processing", icon: Clock, label: "Order Placed" },
  { key: "Shipped", icon: Package, label: "Shipped" },
  { key: "Out for Delivery", icon: Truck, label: "Out for Delivery" },
  { key: "Delivered", icon: CheckCircle2, label: "Delivered" },
];

const statusOrder = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = getOrderById(id);

  if (!order) {
    notFound();
  }

  const isCancelled = order.status === "Cancelled";
  const isReturned = ["Return Initiated", "Returned/Refunded"].includes(order.status);
  const currentStepIndex = statusOrder.indexOf(order.status);
  const showTimeline = !isCancelled && !isReturned;

  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="bg-surface-secondary border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href="/account/dashboard"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-text-primary flex items-center gap-3">
                Order {order.id}
              </h1>
              <p className="text-sm text-text-tertiary mt-1">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            <span
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                isCancelled
                  ? "bg-danger-400/10 text-red-700 border border-danger-400/30"
                  : isReturned
                  ? "bg-warning-400/10 text-yellow-700 border border-warning-400/30"
                  : order.status === "Delivered"
                  ? "bg-success-500/10 text-green-700 border border-success-500/30"
                  : "bg-brand-50 text-brand-700 border border-brand-200"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Tracking Timeline */}
        {showTimeline && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated p-6"
          >
            <h2 className="font-semibold text-text-primary mb-6">Tracking Timeline</h2>
            <div className="flex items-center justify-between relative">
              {/* Progress bar */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-surface-tertiary rounded-full">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${(Math.max(0, currentStepIndex) / (statusSteps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {statusSteps.map((step, i) => {
                const isPast = i <= currentStepIndex;
                const isCurrent = i === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="relative flex flex-col items-center z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isPast
                          ? "gradient-brand text-white shadow-md"
                          : "bg-surface-tertiary text-text-tertiary"
                      } ${isCurrent ? "ring-4 ring-brand-100" : ""}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p
                      className={`mt-2 text-xs font-medium ${
                        isPast ? "text-brand-600" : "text-text-tertiary"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tracking Number */}
            {order.tracking_number && (
              <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-surface-secondary">
                <div>
                  <p className="text-xs text-text-tertiary">Tracking Number</p>
                  <p className="text-sm font-mono font-medium text-text-primary">
                    {order.tracking_number}
                  </p>
                </div>
                <button className="p-2 rounded-lg text-text-tertiary hover:text-brand-500 hover:bg-brand-50 transition-all ml-auto">
                  <Copy className="w-4 h-4" />
                </button>
                {order.carrier && (
                  <span className="px-2 py-1 rounded-md bg-surface-tertiary text-xs text-text-secondary">
                    {order.carrier}
                  </span>
                )}
              </div>
            )}

            {order.estimated_delivery && !order.delivered_at && (
              <p className="mt-3 text-sm text-text-secondary">
                📅 Estimated delivery: <strong>{formatDate(order.estimated_delivery)}</strong>
              </p>
            )}
            {order.delivered_at && (
              <p className="mt-3 text-sm text-success-600">
                ✅ Delivered on <strong>{formatDate(order.delivered_at)}</strong>
              </p>
            )}
          </motion.div>
        )}

        {/* Cancelled / Return Status */}
        {isCancelled && (
          <div className="card-elevated p-6 border-l-4 border-danger-500">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-danger-500" />
              <div>
                <p className="font-semibold text-text-primary">Order Cancelled</p>
                <p className="text-sm text-text-secondary">This order was cancelled. Refund will be processed within 5-7 business days.</p>
              </div>
            </div>
          </div>
        )}

        {isReturned && (
          <div className="card-elevated p-6 border-l-4 border-warning-400">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-warning-500" />
              <div>
                <p className="font-semibold text-text-primary">
                  {order.status === "Return Initiated" ? "Return in Progress" : "Returned & Refunded"}
                </p>
                <p className="text-sm text-text-secondary">
                  {order.status === "Return Initiated"
                    ? "Your return request is being processed."
                    : "This item has been returned and your refund has been processed."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border-subtle">
            <h2 className="font-semibold text-text-primary">Items ({order.items.length})</h2>
          </div>
          <div className="divide-y divide-border-subtle">
            {order.items.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-surface-tertiary flex items-center justify-center shrink-0">
                  <span className="text-2xl">
                    {item.product_name.includes("Book") || item.product_name.includes("ThinkPad") || item.product_name.includes("Zen") || item.product_name.includes("Swift") || item.product_name.includes("Creator")
                      ? "💻" : item.product_name.includes("Prism") || item.product_name.includes("Pixel") || item.product_name.includes("iPhone") || item.product_name.includes("OnePlus") || item.product_name.includes("Galaxy S") || item.product_name.includes("Nothing")
                      ? "📱" : item.product_name.includes("Aura") || item.product_name.includes("AirPods") || item.product_name.includes("WH-") || item.product_name.includes("Buds") || item.product_name.includes("Bose") || item.product_name.includes("JBL")
                      ? "🎧" : "⌚"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary text-sm">{item.product_name}</p>
                  <p className="text-xs text-text-tertiary">Qty: {item.quantity}</p>
                  {item.warranty_expires_on && (
                    <p className="text-xs text-brand-600 mt-1">
                      🛡️ Warranty until {formatDate(item.warranty_expires_on)}
                    </p>
                  )}
                </div>
                <p className="font-bold text-text-primary">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated p-6"
          >
            <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-500" /> Shipping Address
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{order.shipping_address}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-elevated p-6"
          >
            <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-500" /> Payment
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Method</span>
                <span className="text-text-primary font-medium">{order.payment_method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-success-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="text-text-primary">{order.shipping_fee === 0 ? "Free" : formatPrice(order.shipping_fee)}</span>
              </div>
              <hr className="border-border-subtle" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ask NexaBot */}
        <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary">Ask about this order</p>
            <p className="text-xs text-text-secondary">NexaBot can help with returns, warranty, or tracking</p>
          </div>
          <Link
            href="/support"
            className="px-4 py-2 rounded-xl gradient-brand text-white text-xs font-medium"
          >
            Chat <ChevronRight className="w-3 h-3 inline" />
          </Link>
        </div>
      </div>
    </div>
  );
}
