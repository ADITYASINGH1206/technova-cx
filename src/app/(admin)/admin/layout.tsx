"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  BookOpen,
  BarChart3,
  Settings,
  FlaskConical,
  LogOut,
  Menu,
  X,
  Bot,
} from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tickets", label: "Tickets", icon: Ticket },
  { href: "/admin/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/admin/playground", label: "Playground", icon: FlaskConical },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen gradient-admin text-admin-text flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 glass-dark-strong flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-white tracking-tight block leading-tight">
                CX Command
              </span>
              <span className="text-xs text-admin-text-tertiary">TechNova Admin</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-admin-text-secondary hover:text-white hover:bg-admin-surface-elevated"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-admin-accent/15 text-admin-accent"
                    : "text-admin-text-secondary hover:text-white hover:bg-admin-surface-elevated"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-admin-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-admin-text-tertiary">admin@technova.com</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-admin-text-secondary hover:text-danger-400 hover:bg-admin-surface-elevated transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="glass-dark sticky top-0 z-40 px-6 py-3 flex items-center justify-between border-b border-admin-border">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-admin-text-secondary hover:text-white hover:bg-admin-surface-elevated"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success-500/10 text-success-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-success-400 animate-pulse" />
              System Online
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 admin-scrollbar">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
