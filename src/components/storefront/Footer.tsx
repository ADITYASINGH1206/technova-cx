"use client";

import Link from "next/link";

export default function StorefrontFooter() {
  return (
    <footer className="w-full py-unit-xxl bg-surface-container-low dark:bg-surface-container-lowest mt-unit-xxl">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="col-span-1 md:col-span-1">
          <span className="font-headline-lg text-headline-lg text-primary block mb-unit-md">TechNova</span>
          <p className="font-body-md text-body-md text-on-surface-variant">© 2024 TechNova. Engineering the future.</p>
        </div>
        <div className="col-span-1 md:col-span-3 flex justify-end gap-unit-lg items-center">
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 transition-opacity" href="/policies">
            Privacy Policy
          </Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 transition-opacity" href="/policies">
            Terms of Service
          </Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 transition-opacity" href="/policies">
            Shipping Info
          </Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 transition-opacity" href="/policies">
            Returns
          </Link>
        </div>
      </div>
    </footer>
  );
}
