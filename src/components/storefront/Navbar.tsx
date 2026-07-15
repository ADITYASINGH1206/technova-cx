"use client";

import Link from "next/link";

export default function StorefrontNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
      <div className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-20">
        <Link className="font-display-lg text-headline-md tracking-tighter text-primary dark:text-primary-fixed-dim" href="/">
          TechNova
        </Link>
        <div className="hidden md:flex gap-unit-lg items-center">
          <Link className="font-label-md text-label-md uppercase tracking-wider text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors duration-300 scale-98 active:scale-95 transition-transform duration-200" href="/shop">
            Discover
          </Link>
          <Link className="font-label-md text-label-md uppercase tracking-wider text-primary dark:text-primary-fixed-dim relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full hover:text-primary transition-colors duration-300 scale-98 active:scale-95 transition-transform duration-200" href="/shop">
            Products
          </Link>
          <Link className="font-label-md text-label-md uppercase tracking-wider text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors duration-300 scale-98 active:scale-95 transition-transform duration-200" href="/shop">
            Collections
          </Link>
          <Link className="font-label-md text-label-md uppercase tracking-wider text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors duration-300 scale-98 active:scale-95 transition-transform duration-200" href="/support">
            Support
          </Link>
        </div>
        <div className="flex items-center gap-unit-md text-primary dark:text-primary-fixed-dim">
          <Link href="/cart" className="scale-98 active:scale-95 transition-transform duration-200 hover:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
          <Link href="/account/dashboard" className="scale-98 active:scale-95 transition-transform duration-200 hover:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
