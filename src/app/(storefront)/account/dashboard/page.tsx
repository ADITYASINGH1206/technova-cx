"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ChevronRight, MessageCircle } from "lucide-react";
import { orders } from "@/lib/seed-data";
import { formatPrice, formatDate } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Processing: "bg-warning-400/10 text-yellow-700 border border-warning-400/30",
  Shipped: "bg-brand-50 text-brand-700 border border-brand-200",
  "Out for Delivery": "bg-accent-400/10 text-violet-700 border border-accent-400/30",
  Delivered: "bg-success-500/10 text-green-700 border border-success-500/30",
  Cancelled: "bg-danger-400/10 text-red-700 border border-danger-400/30",
  "Return Initiated": "bg-warning-400/10 text-yellow-700 border border-warning-400/30",
  "Returned/Refunded": "bg-success-500/10 text-green-700 border border-success-500/30",
};

export default function AccountDashboardPage() {
  return (
    <div className="min-h-screen bg-surface-primary">
      <div className="bg-surface-secondary border-b border-border-subtle">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-display font-bold text-text-primary mb-1">
            My Orders
          </h1>
          <p className="text-text-secondary">
            Track your orders, manage returns, and get support
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length, color: "brand" },
            { label: "Active", value: orders.filter((o) => ["Processing", "Shipped", "Out for Delivery"].includes(o.status)).length, color: "accent" },
            { label: "Delivered", value: orders.filter((o) => o.status === "Delivered").length, color: "success" },
            { label: "Returns", value: orders.filter((o) => ["Return Initiated", "Returned/Refunded"].includes(o.status)).length, color: "warning" },
          ].map((stat) => (
            <div key={stat.label} className="card-elevated p-4 text-center">
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-tertiary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, i) => {
            const emoji =
              order.items[0].product_name.includes("Book") || order.items[0].product_name.includes("ThinkPad") || order.items[0].product_name.includes("ZenBook") || order.items[0].product_name.includes("Swift") || order.items[0].product_name.includes("Galaxy Book") || order.items[0].product_name.includes("Creator")
                ? "💻"
                : order.items[0].product_name.includes("Prism") || order.items[0].product_name.includes("Pixel") || order.items[0].product_name.includes("iPhone") || order.items[0].product_name.includes("OnePlus") || order.items[0].product_name.includes("Galaxy S") || order.items[0].product_name.includes("Nothing")
                ? "📱"
                : order.items[0].product_name.includes("Aura") || order.items[0].product_name.includes("AirPods") || order.items[0].product_name.includes("WH-") || order.items[0].product_name.includes("Buds") || order.items[0].product_name.includes("Bose") || order.items[0].product_name.includes("JBL")
                ? "🎧"
                : "⌚";

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/account/orders/${order.id}`}
                  className="card-elevated p-4 flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-surface-tertiary flex items-center justify-center shrink-0">
                    <span className="text-2xl">{emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-text-tertiary">{order.id}</span>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[order.status] || ""}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-primary line-clamp-1">
                      {order.items.map((item) => item.product_name).join(", ")}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">
                      {formatDate(order.created_at)} · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-text-primary">{formatPrice(order.total)}</p>
                    <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-brand-500 group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* NexaBot CTA */}
        <div className="mt-10 p-6 rounded-2xl bg-brand-50 border border-brand-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shadow-md shrink-0">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-text-primary">Need help with an order?</p>
            <p className="text-sm text-text-secondary">
              Ask NexaBot about tracking, returns, warranty, or any other issue.
            </p>
          </div>
          <Link
            href="/support"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white text-sm font-medium shadow-md"
          >
            Open Chat <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
