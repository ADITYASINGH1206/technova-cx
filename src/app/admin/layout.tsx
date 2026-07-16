import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-theme min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[var(--color-admin-border)] bg-[var(--color-admin-background)] p-6 flex flex-col gap-8">
        <Link href="/admin/dashboard" className="font-display font-bold text-xl tracking-tight text-[var(--color-admin-foreground)]">
          TechNova<span className="text-[var(--color-admin-accent)]">.ops</span>
        </Link>
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <Link href="/admin/dashboard" className="hover:text-[var(--color-admin-accent)] transition-colors">Dashboard</Link>
          <Link href="/admin/tickets" className="hover:text-[var(--color-admin-accent)] transition-colors">Support Tickets</Link>
          <Link href="/admin/analytics" className="hover:text-[var(--color-admin-accent)] transition-colors">Analytics</Link>
          <Link href="/" className="hover:text-[var(--color-sf-primary)] transition-colors mt-8 opacity-70">← Back to Store</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
