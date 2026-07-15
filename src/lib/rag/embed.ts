/* ============================================================
   RAG Embeddings — Embed KB policies with Gemini
   ============================================================ */

import { embedText } from "@/lib/gemini";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Embed a single KB policy and store the vector in Supabase.
 */
export async function embedAndStorePolicy(policyId: string): Promise<void> {
  const supabase = createServiceClient();

  // Fetch the policy
  const { data: policy, error } = await supabase
    .from("kb_policies")
    .select("id, title, body, category")
    .eq("id", policyId)
    .single();

  if (error || !policy) {
    throw new Error(`Policy ${policyId} not found: ${error?.message}`);
  }

  // Create a rich text to embed (title + category + body)
  const textToEmbed = `${policy.title}\nCategory: ${policy.category}\n\n${policy.body}`;

  // Get embedding from Gemini
  const embedding = await embedText(textToEmbed);

  // Store the embedding
  const { error: updateError } = await supabase
    .from("kb_policies")
    .update({
      embedding: JSON.stringify(embedding), // pgvector accepts JSON array
      updated_at: new Date().toISOString(),
    })
    .eq("id", policyId);

  if (updateError) {
    throw new Error(`Failed to store embedding for ${policyId}: ${updateError.message}`);
  }

  console.log(`[Embed] Successfully embedded policy ${policyId}`);
}

/**
 * Embed all published KB policies (batch operation for initial setup).
 * Adds a small delay between calls to respect Gemini's rate limits.
 */
export async function embedAllPolicies(): Promise<{
  success: number;
  failed: number;
  errors: string[];
}> {
  const supabase = createServiceClient();

  const { data: policies, error } = await supabase
    .from("kb_policies")
    .select("id, title")
    .eq("is_published", true);

  if (error || !policies) {
    throw new Error(`Failed to fetch policies: ${error?.message}`);
  }

  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const policy of policies) {
    try {
      await embedAndStorePolicy(policy.id);
      success++;

      // Small delay to avoid rate limits (100ms between calls)
      await new Promise((r) => setTimeout(r, 100));
    } catch (err) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${policy.id}: ${msg}`);
      console.error(`[Embed] Failed for ${policy.id}:`, msg);
    }
  }

  console.log(
    `[Embed] Complete: ${success} succeeded, ${failed} failed out of ${policies.length} policies`
  );

  return { success, failed, errors };
}
