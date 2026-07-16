"use client";

import Link from "next/link";
import React from "react";
import { useCart } from "@/components/providers/CartProvider";

function StorefrontNavbar() {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 glass-light border-b-0 rounded-b-2xl px-6 py-4 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="font-sans font-bold text-xl tracking-tight text-[var(--color-sf-primary)]">
          TechNova
        </Link>
        <div className="hidden md:flex items-center gap-6 font-sans text-sm font-medium">
          <Link href="/" className="hover:text-[var(--color-sf-primary)] transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-[var(--color-sf-primary)] transition-colors">Shop</Link>
          <Link href="/support" className="hover:text-[var(--color-sf-primary)] transition-colors">Support</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-[var(--color-sf-primary)]/10 transition-colors">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-sf-accent)] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/admin/dashboard" className="p-2 rounded-full hover:bg-[var(--color-sf-primary)]/10 transition-colors text-xs opacity-70">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

function StorefrontFooter() {
  return (
    <footer className="mt-20 py-12 border-t border-[var(--color-sf-border)] bg-[var(--color-sf-background)]">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm opacity-60">
        © 2024 TechNova. Powered by UI-UX Pro Max Design System.
      </div>
    </footer>
  );
}

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col pt-24 bg-mesh-light relative">
      <StorefrontNavbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6">
        {children}
      </main>
      <StorefrontFooter />
    </div>
  );
}
