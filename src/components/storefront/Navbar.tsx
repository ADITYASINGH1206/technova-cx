"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Headphones,
  MessageCircle,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/support", label: "Support" },
  { href: "/policies", label: "Policies" },
];

export default function StorefrontNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="glass-strong mx-4 mt-4 rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-sm">TN</span>
              </div>
              <span className="font-display text-xl font-bold text-text-primary tracking-tight">
                Tech<span className="gradient-text">Nova</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-brand-600"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-tertiary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-brand-50 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                className="p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-all"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account/dashboard"
                className="hidden sm:flex p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-all"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-all"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden glass-strong mx-4 mt-2 rounded-2xl shadow-lg overflow-hidden"
            >
              <nav className="p-4 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-brand-600 bg-brand-50"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-tertiary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <hr className="my-2 border-border-subtle" />
                <Link
                  href="/account/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-tertiary flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Account
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 text-center transition-all"
                >
                  Sign In
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* NexaBot Floating Bubble */}
      <Link href="/support" className="nexabot-bubble gradient-brand" aria-label="Open NexaBot Support">
        <MessageCircle className="w-6 h-6 text-white" />
      </Link>
    </>
  );
}
