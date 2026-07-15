/* ============================================================
   RAG Search — Hybrid search (pgvector + tsvector + RRF)
   ============================================================ */

import { embedQuery } from "@/lib/gemini";
import { createServiceClient } from "@/lib/supabase/server";

export interface PolicySearchResult {
  id: string;
  category: string;
  title: string;
  body: string;
  version: number;
  rrf_score: number;
}

/**
 * Hybrid search over KB policies.
 * Combines dense (pgvector cosine similarity) and lexical (tsvector ts_rank)
 * results using Reciprocal Rank Fusion.
 * 
 * Falls back to text-only search if embeddings aren't populated yet.
 */
export async function hybridSearchPolicies(
  query: string,
  k: number = 3
): Promise<PolicySearchResult[]> {
  const supabase = createServiceClient();

  try {
    // Get query embedding from Gemini
    const queryEmbedding = await embedQuery(query);

    // Call the hybrid search RPC function
    const { data, error } = await supabase.rpc("hybrid_search_policies", {
      query_embedding: JSON.stringify(queryEmbedding),
      query_text: query,
      match_count: k,
    });

    if (error) {
      console.warn("[RAG] Hybrid search RPC error, falling back to text search:", error.message);
      return fallbackTextSearch(supabase, query, k);
    }

    if (data && data.length > 0) {
      return data as PolicySearchResult[];
    }

    // If hybrid search returns empty, try text-only fallback
    return fallbackTextSearch(supabase, query, k);
  } catch (err) {
    console.warn("[RAG] Embedding/search error, falling back to text search:", err);
    return fallbackTextSearch(supabase, query, k);
  }
}

/**
 * Fallback: simple text search using ILIKE when hybrid search is unavailable.
 * This works even before embeddings are populated.
 */
async function fallbackTextSearch(
  supabase: ReturnType<typeof createServiceClient>,
  query: string,
  k: number
): Promise<PolicySearchResult[]> {
  // Try full-text search first
  const { data: ftsResults } = await supabase
    .from("kb_policies")
    .select("id, category, title, body, version")
    .eq("is_published", true)
    .textSearch("search_vector", query, { type: "websearch", config: "english" })
    .limit(k);

  if (ftsResults && ftsResults.length > 0) {
    return ftsResults.map((r: Record<string, unknown>, idx: number) => ({
      ...r,
      rrf_score: 1 / (60 + idx + 1),
    })) as PolicySearchResult[];
  }

  // Last resort: ILIKE keyword matching
  const keywords = query.split(/\s+/).filter((w) => w.length > 2);
  const likeConditions = keywords
    .map((kw) => `body.ilike.%${kw}%`)
    .join(",");

  const { data: likeResults } = await supabase
    .from("kb_policies")
    .select("id, category, title, body, version")
    .eq("is_published", true)
    .or(likeConditions || "id.neq.impossible")
    .limit(k);

  return (likeResults || []).map((r: Record<string, unknown>, idx: number) => ({
    ...r,
    rrf_score: 1 / (60 + idx + 1),
  })) as PolicySearchResult[];
}
