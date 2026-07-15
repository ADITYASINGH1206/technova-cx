/* ============================================================
   Support Agent Tools — 6 tools for post-purchase support
   Each tool queries Supabase and returns structured data
   ============================================================ */

import { createServiceClient } from "@/lib/supabase/server";
import { hybridSearchPolicies } from "@/lib/rag/search";
import type { GeminiFunctionDeclaration } from "@/lib/gemini";

// --- Tool Declarations (for Gemini function calling) ---

export const TOOL_DECLARATIONS: GeminiFunctionDeclaration[] = [
  {
    name: "get_order_status",
    description:
      "Look up the current status, tracking number, carrier, ETA, and item list for a customer's order.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "The order ID, e.g. ORD-7734",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "check_return_eligibility",
    description:
      "Check if an order item is eligible for return based on the 7-day return window from delivery date.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "The order ID, e.g. ORD-7734",
        },
        item_id: {
          type: "string",
          description: "The order item ID, e.g. OI-10001. If not known, pass empty string.",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "check_warranty",
    description:
      "Check if a product is still under warranty based on its category and purchase date. Laptops/Phones/Smartwatches: 12 months, Headphones: 6 months.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "The order ID to check warranty for",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "create_replacement_ticket",
    description:
      "Create a replacement request ticket for a defective or damaged product. The ticket appears on the admin Kanban board.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "The order ID",
        },
        item_id: {
          type: "string",
          description: "The order item ID",
        },
        reason: {
          type: "string",
          description: "Description of the issue/defect",
        },
      },
      required: ["order_id", "reason"],
    },
  },
  {
    name: "log_complaint",
    description:
      "Log a customer complaint as a support ticket. Categories: Product Quality, Delivery Delay, Billing, Service, Other.",
    parameters: {
      type: "object",
      properties: {
        order_id: {
          type: "string",
          description: "Related order ID (if applicable)",
        },
        category: {
          type: "string",
          description: "Complaint category",
          enum: [
            "Product Quality",
            "Delivery Delay",
            "Billing",
            "Service",
            "Other",
          ],
        },
        description: {
          type: "string",
          description: "Description of the complaint",
        },
        severity: {
          type: "string",
          description: "Severity level",
          enum: ["Low", "Medium", "High", "Urgent"],
        },
      },
      required: ["category", "description"],
    },
  },
  {
    name: "retrieve_policy",
    description:
      "Search the knowledge base for relevant policy information. Use this for ANY policy question — never answer from memory.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Natural language search query, e.g. 'return window for electronics' or 'warranty claim process'",
        },
      },
      required: ["query"],
    },
  },
];

// --- Tool Implementations ---

export async function executeToolCall(
  toolName: string,
  args: Record<string, unknown>
): Promise<{
  result: unknown;
  citations: { type: "tool" | "policy"; source: string; policy_id?: string; version?: number; tool_name?: string }[];
}> {
  const supabase = createServiceClient();

  switch (toolName) {
    case "get_order_status":
      return executeGetOrderStatus(supabase, args.order_id as string);

    case "check_return_eligibility":
      return executeCheckReturnEligibility(
        supabase,
        args.order_id as string,
        args.item_id as string | undefined
      );

    case "check_warranty":
      return executeCheckWarranty(supabase, args.order_id as string);

    case "create_replacement_ticket":
      return executeCreateReplacementTicket(
        supabase,
        args.order_id as string,
        args.item_id as string | undefined,
        args.reason as string
      );

    case "log_complaint":
      return executeLogComplaint(
        supabase,
        args.order_id as string | undefined,
        args.category as string,
        args.description as string,
        args.severity as string | undefined
      );

    case "retrieve_policy":
      return executeRetrievePolicy(args.query as string);

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

// --- Individual Tool Implementations ---

async function executeGetOrderStatus(
  supabase: ReturnType<typeof createServiceClient>,
  orderId: string
) {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return {
      result: { error: `Order ${orderId} not found` },
      citations: [{ type: "tool" as const, source: `tool:get_order_status(${orderId})`, tool_name: "get_order_status" }],
    };
  }

  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  return {
    result: {
      order_id: order.id,
      status: order.status,
      tracking_number: order.tracking_number,
      carrier: order.carrier,
      estimated_delivery: order.estimated_delivery,
      delivered_at: order.delivered_at,
      total: order.total,
      payment_method: order.payment_method,
      created_at: order.created_at,
      items: (items || []).map((item: Record<string, unknown>) => ({
        id: item.id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price,
        warranty_expires_on: item.warranty_expires_on,
      })),
    },
    citations: [{ type: "tool" as const, source: `tool:get_order_status(${orderId})`, tool_name: "get_order_status" }],
  };
}

async function executeCheckReturnEligibility(
  supabase: ReturnType<typeof createServiceClient>,
  orderId: string,
  itemId?: string
) {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return {
      result: { error: `Order ${orderId} not found` },
      citations: [{ type: "tool" as const, source: `tool:check_return_eligibility(${orderId})`, tool_name: "check_return_eligibility" }],
    };
  }

  // Must be delivered
  if (order.status !== "Delivered") {
    return {
      result: {
        eligible: false,
        reason: `Order is currently "${order.status}". Returns can only be initiated for delivered orders.`,
        order_status: order.status,
      },
      citations: [{ type: "tool" as const, source: `tool:check_return_eligibility(${orderId})`, tool_name: "check_return_eligibility" }],
    };
  }

  // Check 7-day window
  const deliveredDate = new Date(order.delivered_at);
  const now = new Date();
  const daysSinceDelivery = Math.floor(
    (now.getTime() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const eligible = daysSinceDelivery <= 7;
  const daysRemaining = Math.max(0, 7 - daysSinceDelivery);

  return {
    result: {
      eligible,
      days_since_delivery: daysSinceDelivery,
      days_remaining: daysRemaining,
      reason: eligible
        ? `Eligible for return. ${daysRemaining} days remaining in the 7-day return window.`
        : `Return window has expired. Item was delivered ${daysSinceDelivery} days ago (7-day limit).`,
      refund_amount: eligible ? order.total : 0,
      delivered_at: order.delivered_at,
    },
    citations: [{ type: "tool" as const, source: `tool:check_return_eligibility(${orderId})`, tool_name: "check_return_eligibility" }],
  };
}

async function executeCheckWarranty(
  supabase: ReturnType<typeof createServiceClient>,
  orderId: string
) {
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (!order) {
    return {
      result: { error: `Order ${orderId} not found` },
      citations: [{ type: "tool" as const, source: `tool:check_warranty(${orderId})`, tool_name: "check_warranty" }],
    };
  }

  const { data: items } = await supabase
    .from("order_items")
    .select("*, products:product_id(category)")
    .eq("order_id", orderId);

  const results = (items || []).map((item: Record<string, unknown>) => {
    const product = item.products as Record<string, unknown> | null;
    const category = product?.category as string || "Unknown";
    const warrantyMonths = category === "Headphones" ? 6 : 12;
    const purchaseDate = new Date(order.created_at);
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warrantyMonths);
    const now = new Date();
    const covered = now < expiryDate;
    const daysRemaining = Math.max(
      0,
      Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    );

    return {
      item_id: item.id,
      product_name: item.product_name,
      category,
      warranty_months: warrantyMonths,
      purchase_date: order.created_at,
      warranty_expires_on: expiryDate.toISOString().split("T")[0],
      covered,
      days_remaining: covered ? daysRemaining : 0,
      claim_process: covered
        ? "Contact NexaBot with the issue → we verify warranty → prepaid return label sent → inspect & repair/replace within 7-10 business days."
        : "Warranty has expired. You may still contact support for out-of-warranty repair options.",
    };
  });

  return {
    result: { order_id: orderId, items: results },
    citations: [{ type: "tool" as const, source: `tool:check_warranty(${orderId})`, tool_name: "check_warranty" }],
  };
}

async function executeCreateReplacementTicket(
  supabase: ReturnType<typeof createServiceClient>,
  orderId: string,
  itemId: string | undefined,
  reason: string
) {
  const ticketId = `TCK-${Math.floor(4500 + Math.random() * 500)}`;

  const { error } = await supabase.from("tickets").insert({
    id: ticketId,
    customer_id: "00000000-0000-0000-0000-000000000001", // Demo customer
    order_id: orderId,
    category: "Replacement",
    reason_for_escalation: null,
    priority: "High",
    status: "Open",
    transcript: [{ role: "system", content: `Replacement request: ${reason}` }],
  });

  if (error) {
    return {
      result: { error: `Failed to create ticket: ${error.message}` },
      citations: [{ type: "tool" as const, source: `tool:create_replacement_ticket`, tool_name: "create_replacement_ticket" }],
    };
  }

  return {
    result: {
      ticket_id: ticketId,
      status: "Open",
      message: `Replacement ticket ${ticketId} has been created. Our team will review it and send you a prepaid return label within 24 hours.`,
    },
    citations: [{ type: "tool" as const, source: `tool:create_replacement_ticket(${ticketId})`, tool_name: "create_replacement_ticket" }],
  };
}

async function executeLogComplaint(
  supabase: ReturnType<typeof createServiceClient>,
  orderId: string | undefined,
  category: string,
  description: string,
  severity?: string
) {
  const ticketId = `TCK-${Math.floor(4500 + Math.random() * 500)}`;

  const { error } = await supabase.from("tickets").insert({
    id: ticketId,
    customer_id: "00000000-0000-0000-0000-000000000001",
    order_id: orderId || null,
    category: category as string,
    priority: severity || "Medium",
    status: "Open",
    transcript: [{ role: "system", content: `Complaint: ${description}` }],
  });

  if (error) {
    return {
      result: { error: `Failed to log complaint: ${error.message}` },
      citations: [{ type: "tool" as const, source: `tool:log_complaint`, tool_name: "log_complaint" }],
    };
  }

  return {
    result: {
      ticket_id: ticketId,
      category,
      status: "Open",
      message: `Your complaint has been logged as ticket ${ticketId}. A support specialist will review it within 24 hours.`,
    },
    citations: [{ type: "tool" as const, source: `tool:log_complaint(${ticketId})`, tool_name: "log_complaint" }],
  };
}

async function executeRetrievePolicy(query: string) {
  const results = await hybridSearchPolicies(query, 3);

  return {
    result: {
      policies: results.map((r) => ({
        id: r.id,
        category: r.category,
        title: r.title,
        body: r.body,
        version: r.version,
        relevance_score: r.rrf_score,
      })),
    },
    citations: results.map((r) => ({
      type: "policy" as const,
      source: `policy:${r.id} v${r.version}`,
      policy_id: r.id,
      version: r.version,
    })),
  };
}
