/* ============================================================
   POST /api/embed — Embed all KB policies
   Admin-only endpoint to trigger KB re-embedding
   ============================================================ */

import { NextResponse } from "next/server";
import { embedAllPolicies } from "@/lib/rag/embed";

export async function POST() {
  try {
    console.log("[API /embed] Starting KB embedding...");
    const result = await embedAllPolicies();

    return NextResponse.json({
      message: "KB embedding complete",
      ...result,
    });
  } catch (error) {
    console.error("[API /embed] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to embed policies",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support GET for easy triggering from browser
export async function GET() {
  return POST();
}
