"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, ChevronDown, ChevronRight, Shield } from "lucide-react";

const policies = [
  {
    category: "Returns & Refunds",
    icon: "🔄",
    snippets: [
      { id: "RR-001", title: "Return Window", version: 2, body: "Products can be returned within 7 days of delivery. The item must be unused, in its original packaging, with all accessories and tags intact. Digital products and opened software are non-returnable." },
      { id: "RR-002", title: "Refund Processing", version: 2, body: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund is credited to the original payment method. UPI refunds are typically faster (2-3 business days)." },
      { id: "RR-003", title: "Non-Returnable Items", version: 1, body: "The following items cannot be returned: earbuds/headphones with broken hygiene seals, software licenses, gift cards, and items damaged by the customer. Items purchased during flash sales with 'No Return' tags are final sale." },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: "🚚",
    snippets: [
      { id: "SD-001", title: "Delivery Timeline", version: 3, body: "Standard shipping takes 3-7 business days depending on your location. Metro cities (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata) typically receive orders within 3-4 business days. Remote areas may take up to 10 business days." },
      { id: "SD-002", title: "Free Shipping Policy", version: 2, body: "Free shipping is available on all orders above ₹999. Orders below ₹999 incur a flat shipping fee of ₹99. Express shipping (1-2 business days) is available in select metros for an additional ₹299." },
      { id: "SD-003", title: "Shipping Partners", version: 1, body: "We ship through BlueDart, Delhivery, and DTDC. Tracking information is shared via email and SMS once the order is dispatched. You can also track your order from the Account Dashboard." },
    ],
  },
  {
    category: "Billing & Payments",
    icon: "💳",
    snippets: [
      { id: "BP-001", title: "Accepted Payment Methods", version: 2, body: "We accept UPI (Google Pay, PhonePe, Paytm), credit cards (Visa, Mastercard, Amex, RuPay), debit cards, net banking (all major banks), and EMI options on select cards. Cash on Delivery (COD) is available for orders up to ₹50,000." },
      { id: "BP-002", title: "EMI Options", version: 1, body: "No-cost EMI is available on select products for 3, 6, and 9-month tenures on HDFC, ICICI, SBI, and Axis credit cards. Standard EMI with interest is available on all other supported cards. EMI processing fee may apply." },
    ],
  },
  {
    category: "Warranty & Repairs",
    icon: "🛡️",
    snippets: [
      { id: "WR-001", title: "Standard Warranty Coverage", version: 2, body: "Laptops, Phones, and Smartwatches carry a 12-month manufacturer warranty from the date of purchase. Headphones carry a 6-month warranty. Warranty covers manufacturing defects and hardware failures under normal use." },
      { id: "WR-002", title: "Warranty Exclusions", version: 2, body: "Warranty does not cover: physical damage (drops, water damage, screen cracks), damage from unauthorized modifications or repairs, normal wear and tear (battery degradation, cosmetic scratches), or accessories (chargers, cables, cases)." },
      { id: "WR-003", title: "Warranty Claim Process", version: 3, body: "To file a warranty claim: (1) Contact NexaBot with your order ID, (2) describe the issue, (3) NexaBot will verify your warranty status and create a claim ticket, (4) you'll receive a prepaid return label, (5) ship the item, (6) we inspect and repair/replace within 7-10 business days." },
    ],
  },
  {
    category: "Replacement & Exchange",
    icon: "🔃",
    snippets: [
      { id: "RE-001", title: "Replacement Policy", version: 2, body: "If you receive a defective or damaged product, you can request a replacement within 48 hours of delivery. Photo evidence of the defect/damage is required. Replacement is subject to stock availability — if unavailable, a full refund is processed." },
      { id: "RE-002", title: "Exchange Policy", version: 1, body: "Product exchanges (e.g., different color or variant) are available within 7 days of delivery for select categories. The item must be unused and in original packaging. Price differences are adjusted via the original payment method." },
    ],
  },
  {
    category: "Order Cancellation",
    icon: "❌",
    snippets: [
      { id: "OC-001", title: "Cancellation Window", version: 2, body: "Orders can be cancelled within 2 hours of placement or before the order status changes to 'Shipped', whichever comes first. Once an order is shipped, it cannot be cancelled — you may refuse delivery or initiate a return after delivery." },
      { id: "OC-002", title: "Cancellation Refund", version: 1, body: "Cancelled orders are refunded within 3-5 business days to the original payment method. COD orders that are cancelled have no refund to process. Prepaid cancellations receive a full refund including any shipping charges paid." },
    ],
  },
  {
    category: "Account & Security",
    icon: "🔐",
    snippets: [
      { id: "AS-001", title: "Account Security", version: 2, body: "Your TechNova account is protected with industry-standard encryption. We recommend using a strong, unique password and enabling two-factor authentication (2FA) when available. Never share your login credentials or OTP with anyone." },
      { id: "AS-002", title: "Data Privacy", version: 1, body: "We collect only the data necessary to process orders and provide support. Your personal information is never sold to third parties. You can request account data export or deletion by contacting support. Full privacy policy is available on our website." },
    ],
  },
];

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(policies[0].category);

  const filteredPolicies = policies
    .map((cat) => ({
      ...cat,
      snippets: searchQuery
        ? cat.snippets.filter(
            (s) =>
              s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.body.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : cat.snippets,
    }))
    .filter((cat) => cat.snippets.length > 0);

  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Header */}
      <div className="gradient-hero border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-brand-700 mb-4"
          >
            <BookOpen className="w-4 h-4" />
            Policy Center
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3"
          >
            Our Policies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-lg mx-auto mb-6"
          >
            The exact text NexaBot cites when it answers your questions. Transparent, versioned, and always up to date.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-border-default focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-text-primary transition-all"
            />
          </motion.div>
        </div>
      </div>

      {/* Policies */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="space-y-4">
          {filteredPolicies.map((cat) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-elevated overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === cat.category ? null : cat.category
                  )
                }
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="text-left">
                    <h2 className="font-semibold text-text-primary">
                      {cat.category}
                    </h2>
                    <p className="text-xs text-text-tertiary">
                      {cat.snippets.length} polic{cat.snippets.length === 1 ? "y" : "ies"}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-text-tertiary transition-transform ${
                    expandedCategory === cat.category ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedCategory === cat.category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border-subtle"
                >
                  <div className="p-6 space-y-6">
                    {cat.snippets.map((snippet) => (
                      <div key={snippet.id} id={snippet.id} className="scroll-mt-32">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-text-primary text-sm">
                            {snippet.title}
                          </h3>
                          <span className="shrink-0 px-2 py-0.5 rounded-md bg-surface-tertiary text-text-tertiary text-xs font-mono">
                            v{snippet.version}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {snippet.body}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-text-tertiary">
                          <span className="font-mono">{snippet.id}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Used by NexaBot for grounded answers
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredPolicies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📝</p>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No policies found</h3>
            <p className="text-text-secondary">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
