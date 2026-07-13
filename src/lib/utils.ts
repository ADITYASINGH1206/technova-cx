import { clsx, type ClassValue } from "@/lib/clsx";

// Merge class names utility
export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

// Format price with INR currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Format date to readable string
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

// Generate order ID
export function generateOrderId(): string {
  return `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Generate ticket ID
export function generateTicketId(): string {
  return `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

// Get status color class
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    processing: "text-warning-500",
    shipped: "text-brand-500",
    "out for delivery": "text-accent-500",
    delivered: "text-success-500",
    cancelled: "text-danger-500",
    "return initiated": "text-warning-500",
    "returned/refunded": "text-success-600",
    open: "text-danger-500",
    "in progress": "text-warning-500",
    resolved: "text-success-500",
    closed: "text-text-tertiary",
  };
  return statusColors[status.toLowerCase()] || "text-text-secondary";
}

// Get status badge variant
export function getStatusBadgeVariant(
  status: string
): "default" | "success" | "warning" | "danger" | "info" {
  const map: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
    processing: "warning",
    shipped: "info",
    "out for delivery": "info",
    delivered: "success",
    cancelled: "danger",
    "return initiated": "warning",
    "returned/refunded": "success",
    open: "danger",
    "in progress": "warning",
    resolved: "success",
    closed: "default",
  };
  return map[status.toLowerCase()] || "default";
}
