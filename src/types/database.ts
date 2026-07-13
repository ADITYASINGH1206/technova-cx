/* ============================================================
   Database Types — TechNova CX Command Center
   Matches the Supabase schema from Section 9 of the build spec
   ============================================================ */

// --- Profiles ---
export type UserRole = "customer" | "admin";

export interface Profile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

// --- Products ---
export type ProductCategory = "Laptops" | "Phones" | "Headphones" | "Smartwatches";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  original_price?: number;
  description: string;
  specs: Record<string, string>;
  image_url: string;
  images?: string[];
  rating: number;
  review_count: number;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

// --- Orders ---
export type OrderStatus =
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "Return Initiated"
  | "Returned/Refunded";

export interface Order {
  id: string;
  customer_id: string;
  status: OrderStatus;
  tracking_number?: string;
  carrier?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  total: number;
  subtotal: number;
  shipping_fee: number;
  discount: number;
  payment_method: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

// --- Order Items ---
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  warranty_expires_on?: string;
}

// --- Knowledge Base Policies ---
export type PolicyCategory =
  | "Returns & Refunds"
  | "Shipping & Delivery"
  | "Billing & Payments"
  | "Warranty & Repairs"
  | "Replacement & Exchange"
  | "Order Cancellation"
  | "Account & Security";

export interface KBPolicy {
  id: string;
  category: PolicyCategory;
  title: string;
  body: string;
  version: number;
  is_published: boolean;
  embedding?: number[];
  created_at: string;
  updated_at: string;
}

// --- Conversations ---
export type ConversationIntent =
  | "SUPPORT"
  | "POLICY_FAQ"
  | "PRE_PURCHASE_REDIRECT"
  | "ESCALATE"
  | "UNCLEAR";

export type ConversationStatus = "active" | "resolved" | "escalated";

export interface Conversation {
  id: string;
  customer_id: string;
  intent?: ConversationIntent;
  status: ConversationStatus;
  order_id_in_context?: string;
  turn_count: number;
  started_at: string;
  ended_at?: string;
}

// --- Messages ---
export type MessageRole = "customer" | "assistant" | "system";

export interface Citation {
  type: "policy" | "tool";
  source: string;
  policy_id?: string;
  version?: number;
  tool_name?: string;
}

export interface CriticVerdict {
  verdict: "pass" | "fail";
  confidence: number;
  claims_checked: {
    claim: string;
    supported: boolean;
    source: string;
  }[];
  unsupported_claims: string[];
  flags: string[];
  recommended_action: "show_to_customer" | "escalate" | "retry";
}

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  critic_verdict?: CriticVerdict;
  created_at: string;
}

// --- Tickets ---
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketCategory =
  | "Product Quality"
  | "Delivery Delay"
  | "Billing"
  | "Service"
  | "Warranty"
  | "Return"
  | "Replacement"
  | "Other";

export type EscalationReason =
  | "low_confidence"
  | "hard_trigger_refund"
  | "hard_trigger_legal"
  | "hard_trigger_security"
  | "customer_request"
  | "unresolved_turns"
  | "negative_sentiment";

export interface Ticket {
  id: string;
  conversation_id?: string;
  customer_id: string;
  order_id?: string;
  category: TicketCategory;
  reason_for_escalation?: EscalationReason;
  critic_confidence?: number;
  transcript?: Message[];
  priority: TicketPriority;
  status: TicketStatus;
  assigned_to?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

// --- Feedback ---
export type FeedbackRating = "up" | "down";

export interface Feedback {
  id: string;
  message_id: string;
  rating: FeedbackRating;
  created_at: string;
}

// --- Analytics Events ---
export type AnalyticsEventType =
  | "conversation_started"
  | "conversation_resolved"
  | "conversation_escalated"
  | "tool_called"
  | "critic_pass"
  | "critic_fail"
  | "feedback_received"
  | "cache_hit";

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  payload: Record<string, unknown>;
  created_at: string;
}

// --- Cart (client-side only) ---
export interface CartItem {
  product: Product;
  quantity: number;
}
