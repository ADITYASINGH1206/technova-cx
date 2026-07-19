import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility to merge tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Use dark mode (Admin theme) styling */
  dark?: boolean;
  /** Add Framer Motion style hover scaling */
  interactive?: boolean;
}

export function GlassCard({
  children,
  className,
  dark = false,
  interactive = false,
  ...props
}: GlassCardProps) {
  // Select the appropriate glass class based on theme
  const themeClass = dark ? "admin-panel text-[var(--color-admin-foreground)]" : "glass-light-card";
  
  // Interactive hover states (using standard tailwind transitions)
  const interactiveClass = interactive
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    : "";

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden p-6 relative",
        themeClass,
        interactiveClass,
        className
      )}
      {...props}
    >
      {/* 
        Optional: Subtle gradient shine overlay to enhance glass effect.
        Inverts subtly for global dark mode.
      */}
      {!dark && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 to-transparent pointer-events-none" />
      )}
      
      {/* Content wrapper to stay above the shine overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
