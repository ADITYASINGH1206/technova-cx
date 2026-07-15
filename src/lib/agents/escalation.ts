/* ============================================================
   Escalation Rules — Hard Triggers
   Run BEFORE the Orchestrator's LLM call, bypassing AI entirely
   ============================================================ */

const LEGAL_KEYWORDS = [
  "lawyer", "legal notice", "consumer court", "consumer forum",
  "fir", "police complaint", "sue", "lawsuit", "litigation",
];

const SECURITY_KEYWORDS = [
  "hacked", "unauthorized login", "unauthorized access",
  "otp fraud", "account compromised", "stolen account",
  "identity theft",
];

const HUMAN_REQUEST_PHRASES = [
  "talk to a human", "speak to a human", "real person",
  "talk to a person", "human agent", "connect me to",
  "speak with someone", "real agent", "transfer me",
  "talk to someone", "customer service representative",
];

export interface HardTriggerResult {
  triggered: boolean;
  reason?: string;
  ticketCategory?: string;
  ticketPriority?: string;
}

/**
 * Check hard-trigger rules BEFORE any LLM call.
 * If triggered, bypass the entire AI pipeline and create a ticket immediately.
 */
export function checkHardTriggers(
  message: string,
  context: {
    mentionedRefundAmount?: number;
    unresolvedTurns?: number;
  } = {}
): HardTriggerResult {
  const lower = message.toLowerCase();

  // 1. Refund > ₹10,000
  if (context.mentionedRefundAmount && context.mentionedRefundAmount > 10000) {
    return {
      triggered: true,
      reason: "hard_trigger_refund",
      ticketCategory: "Billing",
      ticketPriority: "High",
    };
  }

  // 2. Legal keywords
  for (const keyword of LEGAL_KEYWORDS) {
    if (lower.includes(keyword)) {
      return {
        triggered: true,
        reason: "hard_trigger_legal",
        ticketCategory: "Other",
        ticketPriority: "Urgent",
      };
    }
  }

  // 3. Security keywords
  for (const keyword of SECURITY_KEYWORDS) {
    if (lower.includes(keyword)) {
      return {
        triggered: true,
        reason: "hard_trigger_security",
        ticketCategory: "Other",
        ticketPriority: "Urgent",
      };
    }
  }

  // 4. Explicit human request
  for (const phrase of HUMAN_REQUEST_PHRASES) {
    if (lower.includes(phrase)) {
      return {
        triggered: true,
        reason: "customer_request",
        ticketCategory: "Service",
        ticketPriority: "Medium",
      };
    }
  }

  // 5. 3+ unresolved turns on the same issue
  if (context.unresolvedTurns && context.unresolvedTurns >= 3) {
    return {
      triggered: true,
      reason: "unresolved_turns",
      ticketCategory: "Service",
      ticketPriority: "High",
    };
  }

  return { triggered: false };
}

/**
 * Extract a refund amount from the message if mentioned.
 * Returns the amount in rupees, or undefined if none found.
 */
export function extractRefundAmount(message: string): number | undefined {
  // Match patterns like ₹15,000 or Rs. 15000 or INR 15,000 or 15000 rupees
  const patterns = [
    /₹\s?([\d,]+)/,
    /rs\.?\s?([\d,]+)/i,
    /inr\s?([\d,]+)/i,
    /([\d,]+)\s?rupees/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      return parseInt(match[1].replace(/,/g, ""), 10);
    }
  }

  return undefined;
}
