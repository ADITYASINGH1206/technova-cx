# TechNova CX Command Center
### A Grounded, Trust-First AI Customer Care System — Zero-Cost Build Spec for Google Antigravity
#### Built for the FlowZint AI Hackathon 2026

---

## How to use this document

This is a single, self-contained mission brief. You do not need to explain the project separately — everything Antigravity needs (architecture, data model, agent logic, tool schemas, sitemap, roadmap) is below.

1. Open **Google Antigravity**, create a new project pointed at an empty repo folder.
2. Open the **Agent Manager**, start a new conversation, and select **Planning Mode**.
3. Paste this entire document as your first message.
4. Let the agent produce a **Plan Artifact** (a task breakdown) before it writes any code. Read it. Comment on anything that looks off, Google-Docs-style, directly on the artifact.
5. Once you approve the plan, work through Section 15 ("17-Day Build Roadmap") one milestone at a time rather than in one giant pass.

Everything in this spec is chosen so the finished product — code, hosting, database, and every AI call — costs **$0** to build, run, and demo. Section 3 explains exactly how, and exactly where the free ceilings are, so nothing surprises you on judging day.

---

## Table of Contents
1. [What This Revision Changes](#1-what-this-revision-changes)
2. [The Zero-Cost Guarantee](#2-the-zero-cost-guarantee)
3. [Hackathon Fit](#3-hackathon-fit)
4. [Product Vision, Explained Properly](#4-product-vision-explained-properly)
5. [Architecture at a Glance](#5-architecture-at-a-glance)
6. [The AI Engine — Orchestrator + Support Agent + Critic Agent](#6-the-ai-engine)
7. [Retrieval Layer (RAG)](#7-retrieval-layer-rag)
8. [Application Structure (Sitemap)](#8-application-structure-sitemap)
9. [Data Model Sketch](#9-data-model-sketch)
10. [Model & Provider Recommendations](#10-model--provider-recommendations)
11. [Optional Paid Upgrade Path (Claude)](#11-optional-paid-upgrade-path-claude)
12. [Features Beyond a Bare-Minimum Bot](#12-features-beyond-a-bare-minimum-bot)
13. [Design System — "Anti-Gravity"](#13-design-system--anti-gravity)
14. [Staying Inside the Free Tier: Operations Checklist](#14-staying-inside-the-free-tier-operations-checklist)
15. [17-Day Build Roadmap](#15-17-day-build-roadmap)
16. [Submission Checklist (FlowZint Requirements)](#16-submission-checklist-flowzint-requirements)
17. [Using This Document Inside Antigravity](#17-using-this-document-inside-antigravity)

---

## 1. What This Revision Changes

If you've seen an earlier version of this spec, here's exactly what moved and why:

- **The runtime LLM provider changed from Claude to Gemini.** Anthropic's Claude API has no free tier at all — it's metered from the very first token, for every account. Google's Gemini API does have a genuine, ongoing, no-credit-card free tier. Since the brief is "this must cost nothing to build," Gemini is now the default for all three agents. Claude is kept as a clearly-labeled **optional upgrade** in Section 11, for teams who later want to spend real money for a quality bump.
- **The agent orchestration logic moved off Vercel serverless functions and onto Supabase Edge Functions.** This isn't cosmetic — it's load-bearing. Vercel's free Hobby plan hard-caps a serverless function at **10 seconds**, no override, no exception. A pipeline that calls three LLMs in sequence (classify → tool-use loop → fact-check) will blow past that on a bad network day. Supabase Edge Functions on the free tier get **150 seconds** of wall-clock budget for the same job. Section 5 explains the split.
- **Embeddings moved to Gemini's own embedding model**, which has a generous free tier and needs no separate service to host — it's one more call from the same Edge Function that's already calling Gemini for generation.
- **A new Section 2 (Zero-Cost Guarantee)** lays out, service by service, exactly what's free, what the ceiling is, what happens if you hit it, and how to avoid hitting it. This is the section to read before you write a single line of code.
- **A new Section 14 (Operations Checklist)** covers the one free-tier gotcha that actually bites hackathon teams: Supabase pauses a free project after 7 days of no traffic. A two-minute GitHub Actions workflow fixes this permanently, for free.
- Everything else — the two-agent design (Support + Critic), the sitemap, the data model, the design language, the roadmap shape — carries over, refined and double-checked against current documentation rather than assumed from memory.

---

## 2. The Zero-Cost Guarantee

Every piece of this stack has a real, ongoing, no-credit-card-required free tier. None of them are time-limited trials. Here's the full accounting, verified as of July 2026 — plan settings and quotas do shift over time, so treat the ceiling numbers as "confirm this in the dashboard before you rely on it," not gospel carved in stone.

| Service | What it's used for | Free ceiling | What happens if you hit it | How this build stays under it |
|---|---|---|---|---|
| **Google Antigravity** | The tool building the app | Free, full stop, in public preview for any personal Gmail account | N/A — no paid tier currently exists to hit | Just use it |
| **Gemini API** | All three agents' LLM calls + embeddings | No card required. Flash-tier models get roughly 10–15 requests/minute and several hundred to ~1,500 requests/day (exact numbers move — check `ai.google.dev/gemini-api/docs/rate-limits` in Google AI Studio for your project's live figures) | HTTP 429; the request fails until the per-minute or per-day window resets | Route Orchestrator + Critic to the lightest Flash-tier model; queue/backoff on 429; a hackathon demo (a handful of test conversations) uses a tiny fraction of the daily quota |
| **Supabase (Postgres + Auth + Storage + Realtime + Edge Functions + pgvector)** | Database, auth, file storage, live trace stream, agent orchestration, vector search | 500 MB database, 1 GB file storage, 50,000 monthly active users, 5 GB egress/month, 500,000 Edge Function invocations/month, 2 active projects, no card required, **commercial use explicitly permitted** | Free project **pauses after 7 days with no database traffic** (data is retained, just offline until you click "resume"); crossing a hard quota returns errors until the next cycle or an upgrade | 500 MB comfortably covers 20–25 products, 12–15 orders, 15–25 policy snippets, and weeks of chat transcripts; Section 14 gives you the one-file fix for the 7-day pause |
| **Vercel (Hobby plan)** | Hosting the Next.js frontend | Free forever, no card. ~100 GB bandwidth/month, on the order of 100,000 serverless invocations/month, **10-second hard timeout per serverless function (cannot be raised on Hobby)** | Deployments/functions pause until the next monthly cycle; a function that runs past 10s just fails with a timeout error, no matter what | The frontend only ever calls a Supabase Edge Function for anything agent-related — it never runs the multi-agent pipeline itself, so it never approaches the 10s wall |
| **GitHub** | Source control, required-public repo, free CI via Actions | Unlimited public repos, unlimited Actions minutes on public repos | N/A | The hackathon already requires a public repo, so this is free by construction |
| **YouTube (unlisted)** | Demo video hosting | Free | N/A | Unlisted video satisfies "publicly accessible without login" |

**One honest caveat on Vercel:** the Hobby plan's terms restrict it to non-commercial, personal use. A hackathon submission with a mocked storefront, fake payments, and seeded demo data is squarely inside that — it's a demo, not a live business — so Hobby is the right tier here. If TechNova ever becomes a real product taking real orders, that's the point to move to Vercel Pro (~$20/month).

**One honest caveat on Gemini's free tier:** Google's terms note that prompts and responses sent on the *unpaid* tier may be used to improve their models, and human reviewers may see them. For a hackathon demo running entirely on seeded, fake customer/order data, that's a non-issue — just don't route real personal data through the free tier in a future production version without checking the current data-use terms.

---

## 3. Hackathon Fit

Verified directly against the official FlowZint portal (`flowzint.in/2026/ai/hackothon`) and its listings on Unstop and Internshala.

**Four tracks:** Sales Bot, Support Chat Bot, Customer Care Bot, and Open Innovation. TechNova has no sales agent by design (see Section 4), so it's a clean, undiluted entry rather than something spread across two tracks.

**Recommended category: Customer Care Bot** — the track's own tagline is "Resolve queries, retain customers, build trust," which is close to a literal description of the Critic Agent and its confidence gate. **Support Chat Bot** is a legitimate second choice if you'd rather pitch ticket-deflection than trust.

**Official judging weights, and how this spec earns each one:**

| Criterion | Weight | How this build earns it |
|---|---|---|
| Model Innovation & Novelty | 30% | A three-role pipeline with a dedicated Critic/trust-gate, a numeric confidence threshold that forces escalation, hybrid lexical+vector retrieval, a live trace console, and knowledge-base versioning with a pre-publish playground |
| Real-World Applicability | 25% | Solves the highest-volume, highest-cost slice of real e-commerce support: order status, returns, warranty, replacements, complaints |
| Technical Architecture | 25% | Clean Next.js/Supabase separation, typed tool schemas, RLS-secured data model, structured JSON contracts between agents, and a hosting split (Section 5) chosen specifically so nothing times out on a free tier |
| Documentation Clarity | 20% | This spec doubles as your README skeleton — see Section 16 |

**Structural facts to plan around:** teams of up to 4; a program that runs Day 1–7 (registration), **Day 8–24 (build)**, Day 25–27 (submission), Day 28–29 (evaluation), Day 30+ (results). These are counted from *your* registration date, not a fixed calendar date — confirm your own cohort's actual dates on your FlowZint dashboard before you lock in a schedule. **Compliance is strict and stated plainly on the portal: "Incomplete details or private links will trigger automatic rejection."** Your GitHub repo and demo video must both be reachable by someone with no login and no invite. Total prize pool is ₹3,00,000; every participant gets 5,000 FlowZint Credits regardless of placement, rising to 10,000 for the top 100 (Silver) and 20,000 plus cash and an internship offer for the top 3 (Gold). What the Credits are redeemable for is documented on the portal's own "API Reference" / "Integration Schedule" pages — check those before assuming they cover an Anthropic bill; this spec is written so you don't need them to cover anything.

---

## 4. Product Vision, Explained Properly

TechNova is a fictional online electronics store — laptops, phones, headphones, smartwatches. The storefront (browse, cart, checkout) is a normal, rule-based e-commerce UI. The actual product being judged is what happens **after** a purchase: **NexaBot**, an AI support system that handles tracking, returns, warranty claims, replacements, and complaints, and that is built to *show its work* rather than ask to be trusted.

Three ideas do all the work:

1. **Nothing gets said without a receipt.** Every factual claim NexaBot makes — an order's ETA, a warranty window, a refund amount — is required to trace back to either a live tool call (a real lookup against the seeded database) or a specific, versioned line in the knowledge base. Never a claim from the model's memory.
2. **A second, silent model checks the first one before the customer ever sees it.** The Support Agent drafts an answer; a Critic Agent — invisible to the customer — extracts every factual claim in that draft and checks each one against its stated source. It returns a confidence score, not prose.
3. **Below a threshold, a human takes over automatically, with full context.** If confidence drops under 0.6, or a hard trigger fires (a large refund, legal language, an account-security keyword, an explicit request for a human), the conversation routes straight to a ticket — no dead end, no "I'm not sure" shrug.

**A concrete walkthrough, so this isn't abstract.** A customer, call her Ananya, types: *"my wireless earbuds have stopped charging, are they still under warranty?"*

- The **Orchestrator** (a fast, cheap model that runs on every single message) classifies this as `SUPPORT`, notices no order ID was given, and asks one clarifying question: which order is this? Ananya replies `ORD-7734`.
- The **Support Agent** now has an order ID. It calls the `check_warranty` tool with the product category and purchase date pulled from that order, and separately calls `retrieve_policy` for the warranty claim process. Both come back with real data: covered, 3 months remaining, and the exact claim-process text from the knowledge base.
- The Support Agent drafts a short, warm reply stating the earbuds are covered, when the warranty expires, and how to start a claim — and attaches a `citations` field pointing at the tool result and the specific policy chunk it used.
- The **Critic Agent** — which Ananya never sees — pulls out every factual claim in that draft ("covered," "expires on X," "claim process is Y") and checks each one against the tool output and the policy chunk. All three check out. It returns `{"verdict": "pass", "confidence": 0.94}`.
- Because 0.94 clears the 0.6 threshold, the reply is shown to Ananya with a small citation chip reading "Grounded in: Warranty & Repairs Policy v2." If she taps it, it deep-links to the exact clause on the public `/policies` page — the same text the Critic just checked her answer against.

That closed loop — chat cites a source, the source is publicly inspectable, and a second model already verified the match before either of you saw it — is the single strongest "trustworthy AI" story in the whole build. Everything else in this document exists to make that loop real rather than a slide.

**Explicitly out of scope for a 4-week hackathon window** (state this plainly in your README so judges read it as a deliberate boundary, not a gap): real payment processing, real carrier/logistics integration, multi-language or voice support, native mobile apps, legal review of the demo policy text.

A ready-to-adapt project description for the submission form (comfortably over the 50-word minimum):

> TechNova CX Command Center is a grounded, trust-first customer care assistant for e-commerce, running entirely on free-tier infrastructure. A lightweight Orchestrator (Gemini 2.5 Flash-Lite) classifies and routes every message, a Support Agent (Gemini 2.5 Flash) resolves order tracking, returns, warranty, and replacement requests using live tools and a hybrid-search knowledge base, and a silent Critic Agent fact-checks every claim before it reaches the customer — auto-escalating to a human whenever confidence drops below 0.6 or a high-stakes trigger fires. Admins get a live trace console, a Kanban escalation desk, knowledge-base versioning, and analytics on deflection rate and hallucinations prevented, turning "trustworthy AI" into something measurable instead of a marketing line.

---

## 5. Architecture at a Glance

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 16 (App Router) + React 19, hosted on **Vercel Hobby** | Free forever, Antigravity's browser-verification tooling drives it natively |
| Styling / motion | Tailwind CSS + Framer Motion | The Anti-Gravity glassmorphism theme, Section 13 |
| Database / auth / storage / realtime | **Supabase (Postgres)** free tier | Auth, Realtime, Storage, Row-Level Security, all bundled, all free |
| **Agent orchestration** | **Supabase Edge Functions** — *not* Vercel API routes | 150-second wall-clock budget vs. Vercel Hobby's hard 10-second cap. This is the load-bearing decision in this whole architecture — see the callout below |
| Vector + lexical search | Postgres `pgvector` + Postgres full-text search (`tsvector`), combined with Reciprocal Rank Fusion | Lives inside the same free Supabase project; no separate service to deploy or keep alive |
| LLM provider | **Google Gemini API** (free tier) | Genuine no-card free tier; see Section 10 |
| Embeddings | **Gemini's embedding model** (free tier) | One more call to the same provider, no extra service |
| Build tool | Google Antigravity | Free, agent-first IDE; this document is the mission brief for it — Section 17 |

### ⚠️ The one architecture decision that matters most

**Never put the Orchestrator → Support Agent → Critic Agent chain inside a Next.js API route deployed on Vercel Hobby.** That route has a hard 10-second execution ceiling with no way to raise it, and a real pipeline — classify, run a multi-step tool loop against the database, retrieve policy chunks, generate a draft, then run a second model to fact-check it — will realistically take longer than that under normal network conditions, especially on a free-tier LLM call that's sharing capacity with everyone else on the internet.

Instead: **the entire agent pipeline lives in one Supabase Edge Function** (e.g. `POST /functions/v1/handle-message`), which gets 150 seconds of wall-clock budget on the free tier — plenty of headroom. The Next.js frontend calls that one endpoint and streams or polls for the result. Vercel only ever serves pages and makes that single outbound call; it never runs the heavy logic itself, so its 10-second cap is never in play.

Message flow, end to end:

```
Customer message (Next.js frontend on Vercel)
      │
      ▼  single fetch() to a Supabase Edge Function
┌─────────────────────────────────────────────┐
│  SUPABASE EDGE FUNCTION: handle-message       │  ← runs the entire pipeline below,
│  (150s wall-clock budget, free tier)          │     150-second budget, not 10
└──────────────────┬────────────────────────────┘
                    │
                    ▼
┌───────────────────────────┐
│   ORCHESTRATOR AGENT       │   Gemini 2.5 Flash-Lite — classify + route
└──────────────┬─────────────┘
               │
   ┌───────────┼───────────────┬──────────────────────┐
   ▼           ▼                ▼                       ▼
SUPPORT /   PRE_PURCHASE     ESCALATE               UNCLEAR
POLICY_FAQ   _REDIRECT      (hard trigger or         → one clarifying
   │        (no agent —      customer request)          question,
   │         rule-based                │                then re-route
   │         message + CTA             ▼
   ▼         to /shop)          Escalation ticket
┌───────────────────────────┐   created directly
│   SUPPORT AGENT             │   (skips both LLMs
│   Gemini 2.5 Flash           │    entirely — see
│   tools + RAG                │    Section 6.4)
└──────────────┬───────────────┘
               ▼
┌───────────────────────────┐
│   CRITIC AGENT               │   Gemini 2.5 Flash — confidence gate
│   (silent — customer never    │
│    sees this step)            │
└──────────────┬─────────────────┘
               │
        ┌──────┴───────┐
        ▼               ▼
   PASS (≥0.6)      FAIL (<0.6)
        │               │
        ▼               ▼
  Response returned   Response returned
  with citations       as an escalation card,
  to the frontend      ticket already created
```

---

## 6. The AI Engine

All three agents share the retrieval layer from Section 7 and live inside the single Edge Function described above.

### 6.1 Orchestrator Agent (The Traffic Controller)

**Runs on:** every incoming message, first, before anything else. **Model:** `gemini-2.5-flash-lite` — this is the one agent where latency and free-tier request budget matter most, since it fires on every single turn.

Five-way classification:

| Intent | Trigger examples | Routed to | LLM call |
|---|---|---|---|
| `SUPPORT` | "Where's my order", "I want a refund", "Is my laptop still under warranty" | Support Agent (full tool loop) | Yes |
| `POLICY_FAQ` | "What's your return window", "Do you ship to Nagaland", "Can I pay by EMI" | Support Agent (it already owns `retrieve_policy`) | Yes |
| `PRE_PURCHASE_REDIRECT` | "Which laptop should I buy", "Compare iPhone vs Pixel" | No agent — static redirect + CTA to `/shop` | No |
| `ESCALATE` | "Talk to a human", hard-trigger keywords, angry sentiment | Straight to ticket creation | No (rule-based) |
| `UNCLEAR` | Ambiguous first message | One clarifying question | Yes |

Redirect copy for `PRE_PURCHASE_REDIRECT` — write this once as a static string, don't burn an API call generating it every time:
> "Great question! I'm your post-purchase care assistant, so I can't recommend products directly — but the full catalog with filters is right here: **Browse Shop →**. Once you've ordered, I'm here for tracking, returns, warranty, and anything else you need."

**Conversation state** (maintained and updated every turn, not re-derived from scratch each time):

```json
{
  "conversation_id": "CONV-8841",
  "customer_id": "CUS-1092",
  "intent": "SUPPORT",
  "order_id_in_context": "ORD-7734",
  "turn_count": 2,
  "unresolved_turns_on_same_issue": 1,
  "status": "active"
}
```

**System prompt skeleton:**
- You are TechNova's routing layer. You never talk to the customer directly except to ask one clarifying question or deliver a redirect/escalation message.
- Classify into exactly one of: `SUPPORT`, `POLICY_FAQ`, `PRE_PURCHASE_REDIRECT`, `ESCALATE`, `UNCLEAR`.
- Extract structured entities when present: `order_id`, `product_category`, `refund_amount`.
- Hard-trigger checks run as deterministic rules *before* you're ever called — if one fires, you're skipped and the ticket is created directly by application code.
- Update `conversation_state` every turn; never re-ask for information already given.
- Output strictly the state JSON — no prose outside it.

**Implementation tip:** set `generationConfig.responseMimeType` to `application/json` and pass a `responseSchema` matching the state object above. Gemini will constrain its output to that schema, which is more reliable than relying on the system prompt's "output strictly JSON" instruction alone.

### 6.2 Support Agent (Post-Purchase + Policy)

**Runs on:** `SUPPORT` and `POLICY_FAQ` intents. **Model:** `gemini-2.5-flash` — Flash-tier models on Gemini support native function calling, which is what a customer-facing agent doing order lookups *and* grounded generation in one turn needs, at free-tier cost.

General policy Q&A is folded into this agent rather than given its own agent — it already owns `retrieve_policy`, so it's a natural fit.

| Tool | Input | Output | Notes |
|---|---|---|---|
| `get_order_status` | `order_id` | status, tracking_number, carrier, ETA, items[] | Mocked against seeded Supabase orders |
| `check_return_eligibility` | `order_id`, `item_id` | eligible (bool), days_remaining, reason, refund_amount | Reasoned against the Returns & Refunds policy + the order's `delivered_at` date |
| `check_warranty` | `product_category`, `purchase_date` | covered (bool), expires_on, claim_process | Category table: Laptops/Phones/Smartwatches 12 mo, Headphones 6 mo — demo values, customize freely |
| `create_replacement_ticket` | `order_id`, `item_id`, `reason` | `ticket_id` | Appears immediately on `/admin/tickets` |
| `log_complaint` | `order_id` (nullable), `category`, `description`, `severity` | `ticket_id` | Categories: Product Quality / Delivery Delay / Billing / Service / Other |
| `retrieve_policy` | natural-language `query` | ranked chunks: `policy_id`, `version`, `text`, `category` | Hybrid search — Section 7 |

Gemini function-declaration shape for one of these tools, as a concrete example for whoever wires this up (this is the standard `generateContent` REST/SDK format — see `ai.google.dev/gemini-api/docs/function-calling` for the current reference):

```json
{
  "functionDeclarations": [
    {
      "name": "get_order_status",
      "description": "Look up the current status, tracking number, and item list for a customer's order.",
      "parameters": {
        "type": "object",
        "properties": {
          "order_id": {
            "type": "string",
            "description": "e.g. ORD-7734"
          }
        },
        "required": ["order_id"]
      }
    }
  ]
}
```

**System prompt skeleton:**
- You are NexaBot, TechNova's post-purchase support specialist. You only discuss the current customer's own orders, returns, warranty, replacements, and shipping/billing policy — never recommend or compare products to buy.
- Every factual claim must come from a tool result or a retrieved policy chunk. Never state a policy detail from memory.
- Call `retrieve_policy` before answering any policy question, even ones you feel confident about.
- Attach a citation (`policy_id` + version, or tool name) to every claim in a `citations` output field.
- If nothing supports a claim, say so plainly instead of guessing.
- Keep responses short, warm, plain language — no legalese.

### 6.3 Critic Agent (The Trust Gate)

**Runs on:** every draft response the Support Agent produces, silently — the customer never sees its output. **Model:** `gemini-2.5-flash` by default. If you want a stretch upgrade for extra rigor, `gemini-2.5-pro` is also free but far more tightly rate-limited (roughly 5 requests/minute, a low daily cap) — fine for occasional testing, risky as the live path during a judged demo where you can't predict how many messages you'll send.

**Input:** the draft response, the source chunks/tool outputs it relied on, and the original customer message.

**Output (strict JSON, no prose):**

```json
{
  "verdict": "pass",
  "confidence": 0.91,
  "claims_checked": [
    { "claim": "Order ORD-7734 is shipped, ETA 14 Jul", "supported": true, "source": "tool:get_order_status" },
    { "claim": "Headphones carry a 6-month warranty", "supported": true, "source": "policy:warranty-headphones-v2" }
  ],
  "unsupported_claims": [],
  "flags": [],
  "recommended_action": "show_to_customer"
}
```

**System prompt skeleton:**
- You are a silent auditor. The customer never sees your output.
- Extract every factual claim in the draft response.
- For each, check whether it's directly supported by a source; mark `supported`/`unsupported`.
- Confidence is the proportion of supported claims, weighted down further for anything involving money, legal, or account-security topics.
- Output strictly the verdict JSON — no prose, and never rewrite the draft yourself, only judge it.

As with the Orchestrator, use `responseSchema` to constrain this output to valid JSON rather than trusting the prompt alone — a Critic that occasionally returns prose instead of a parseable verdict defeats the entire point of the gate.

**Stretch upgrade — Two-Stage Cascade:** run the fast `gemini-2.5-flash-lite` pass first; only escalate to `gemini-2.5-flash` (or `gemini-2.5-pro`) for a deeper check when the fast pass lands in a borderline 0.5–0.75 band. This is a genuinely good "Model Innovation" talking point if you have a spare day; the single-stage Critic above is the reliable default if you're tight on time.

### 6.4 Confidence Gate & Escalation Rules

- `confidence ≥ 0.6` → **PASS** → shown to the customer with citation chips.
- `confidence < 0.6` → **FAIL** → auto-escalate. A floating card appears: *"Connecting you to a human agent — here's your ticket #4521."*
- **Stretch — one retry:** if `0.6 ≤ confidence < 0.75`, feed the Critic's flags back to the Support Agent for a single regeneration attempt before re-checking. Cap it at one retry, both for latency and because a second free-tier LLM round-trip inside the same 150-second Edge Function budget is not infinite.
- **Hard triggers** — a deterministic rule layer that runs *before* the Orchestrator's LLM call, bypassing both models entirely:
  - Refund/claim amount above **₹10,000**
  - Legal keywords (lawyer, legal notice, consumer court, FIR)
  - Account-security keywords (hacked, unauthorized login, OTP fraud)
  - Explicit human request ("talk to a human," "real person")
  - 3+ back-and-forth turns on the same unresolved issue
  - *(Stretch)* negative sentiment above a threshold from a lightweight sentiment check

**Escalation ticket schema:**

```json
{
  "ticket_id": "TCK-4521",
  "customer_id": "CUS-1092",
  "order_id": "ORD-7734",
  "category": "Warranty",
  "reason_for_escalation": "low_confidence",
  "critic_confidence": 0.42,
  "transcript": [ "...full message array..." ],
  "priority": "Medium",
  "status": "Open",
  "created_at": "2026-07-12T10:42:04Z"
}
```

**Sample live trace** for `/admin/dashboard` (Section 8) — this is exactly the granularity to stream over Supabase Realtime:

```
[10:42:01] Session started · customer_id=CUS-1092
[10:42:01] Orchestrator → Intent classified: SUPPORT (confidence 0.94)
[10:42:02] Support Agent → Tool call: get_order_status(order_id="ORD-7734")
[10:42:02] Tool result: status=Shipped, eta=14 Jul
[10:42:03] Support Agent → Draft response generated
[10:42:03] Critic Agent → Checking 2 claims against 1 source
[10:42:04] Critic Agent → Verdict: PASS · confidence=0.91
[10:42:04] Response delivered to customer
```

---

## 7. Retrieval Layer (RAG)

All three agents share one retrieval layer over the 15–25 policy snippets in the knowledge base, entirely inside the free Supabase project — no separate vector database service to deploy or keep alive.

**Dense search:** the `pgvector` extension (included free on every Supabase project, no add-on needed). Embed each policy chunk with **Gemini's embedding model**, called from the same Edge Function that's already talking to Gemini for generation — no second provider, no second API key to manage. Gemini's embedding endpoint lets you request a smaller output dimension (e.g. 768) if you want a leaner index; check the current default and max in the embeddings section of `ai.google.dev/gemini-api/docs` before you commit to a number.

**Lexical search:** Postgres full-text search (`tsvector` / `ts_rank`), which behaves like a lightweight BM25.

**Combine both** with Reciprocal Rank Fusion so a query that's mostly keyword-driven ("EMI") and a query that's mostly semantic ("can I pay in installments") both retrieve well.

Organize the knowledge base into 7 categories so it lines up 1:1 with the Support Agent's tools: **Returns & Refunds, Shipping & Delivery, Billing & Payments, Warranty & Repairs, Replacement & Exchange, Order Cancellation, Account & Security.** 2–4 snippets per category lands you in the 15–25 range with real coverage instead of a flat, uncategorized list.

**Citation chips** ("Grounded in: Policy X") carry `policy_id` + `version` and deep-link to the matching entry on the public `/policies` page (Section 8) — the same text the Critic checked against, visible to the customer. That loop — chat cites, the source is publicly inspectable, the Critic already verified the match — is the single strongest trust story in the app. Get it airtight before polishing anything else.

---

## 8. Application Structure (Sitemap)

### 8.1 Consumer Storefront

| Route | Purpose | Key components | Priority |
|---|---|---|---|
| `/` | Cinematic home | Full-screen hero, parallax scroll, "Trending Tech" carousel, category grids | Core |
| `/shop` | Master catalog | 20–25 seeded products, sidebar filters (brand/price/category) — plain UI, no AI | Core |
| `/product/[id]` | Product detail | Hi-res gallery, sticky Add to Cart, specs table, floating NexaBot bubble, rule-based "More in this category" | Core |
| `/cart` | Slide-out drawer | Line items, quantity, mock promo code, subtotal | Core |
| `/checkout` | Multi-step simulator | Shipping → Payment (mock) → Review → Confirmation | Core |
| `/account/dashboard` | Order history | 12–15 seeded orders spanning every status | Core |
| `/account/orders/[id]` | Single order detail | Visual tracking timeline, "Ask about this order" → pre-fills `/support` with order context | Added |
| `/account/settings` | Profile | Name/email/address (demo only, no real payment storage) | Added |
| `/support` | The NexaBot Hub | Full chat UI, Intent Badge (`Support` / `Policy FAQ` / `Escalated`), quick replies, citation chips, escalation floating card | Core |
| `/policies` | Public policy center | Renders the exact KB the Critic checks against; citation chips deep-link here | Added |
| `/login`, `/signup` | Supabase Auth | Email/password, optional OAuth | Core |
| 404 / empty states | — | Consistent Anti-Gravity styling | Core |

### 8.2 Admin CX Command Center

| Route | Purpose | Key components | Priority |
|---|---|---|---|
| `/admin/login` | Admin auth | Role-gated via Supabase RLS + a role claim | Core |
| `/admin/dashboard` | Live monitoring | Split-screen: live chats (left) + dev-terminal-style trace (right) over Supabase Realtime | Core |
| `/admin/tickets` | Escalation helpdesk | Kanban: Open / In Progress / Resolved / Closed | Core |
| `/admin/tickets/[id]` | Ticket detail + Agent Assist | Shows the AI's draft answer, critic confidence, and reason; human approves, edits, or sends | Added |
| `/admin/knowledge-base` | Policy CMS | 15–25 snippets across 7 categories; add/edit/archive | Core |
| `/admin/knowledge-base/[id]` | Version history | Diff view + "used in N grounded answers this week" | Added |
| `/admin/playground` | Pre-publish testing | Type a test query, see the Support Agent + Critic respond against a **draft** KB edit before publishing | Added |
| `/admin/analytics` | Metrics | Deflection rate, hallucinations prevented, avg. critic confidence, escalation-reason breakdown, CSAT, resolution time, latency p50/p95 | Core (expanded) |
| `/admin/settings` | Agent config | Confidence-threshold slider (0.4–0.8), hard-trigger keyword list editor | Added |

---

## 9. Data Model Sketch

| Table | Key fields | Notes |
|---|---|---|
| `profiles` | id, role (`customer`/`admin`), name, email | Extends `auth.users` |
| `products` | id, name, category, brand, price, specs (jsonb), image_url | 20–25 seeded rows |
| `orders` | id, customer_id, status, tracking_number, carrier, delivered_at, total | 12–15 seeded rows across every status |
| `order_items` | order_id, product_id, quantity, warranty_expires_on | |
| `kb_policies` | id, category, title, body, version, is_published, embedding (vector) | Versioned; drives `/policies` + citations + retrieval |
| `conversations` | id, customer_id, intent, status, started_at | One row per NexaBot session |
| `messages` | id, conversation_id, role, content, citations (jsonb), critic_verdict (jsonb) | Full transcript |
| `tickets` | id, conversation_id, category, reason_for_escalation, critic_confidence, priority, status | Powers the Kanban board |
| `feedback` | message_id, rating (up/down) | Powers CSAT |
| `analytics_events` | type, payload (jsonb), created_at | Raw log for charts |

Seed the orders table across **every** status (Processing, Shipped, Out for Delivery, Delivered ×5+, Cancelled, Return Initiated, Returned/Refunded) so every Support Agent tool path has at least one order to exercise during your demo — nothing kills a live demo like a tool call that returns empty because the seed data only covered the happy path.

This entire table set, fully seeded, comfortably fits inside Supabase's 500 MB free-tier database — text-heavy tables like `messages` and `kb_policies` are the ones to watch, but at hackathon-demo volume (dozens of conversations, not thousands) you won't get close.

---

## 10. Model & Provider Recommendations

This is the default, **free**, build-this-and-pay-nothing stack.

| Agent | Model | Why this one |
|---|---|---|
| Orchestrator | `gemini-2.5-flash-lite` | Free tier, highest requests-per-minute headroom of the Gemini lineup, more than enough reasoning for a 5-way classification + entity extraction task that runs on every turn |
| Support Agent | `gemini-2.5-flash` | Free tier, native function calling, strong enough for multi-step tool use plus grounded generation |
| Critic Agent | `gemini-2.5-flash` (default) / `gemini-2.5-pro` (stretch) | Flash is free and fast enough to run silently on every response; Pro is also free but far more rate-limited, so treat it as an occasional-testing upgrade, not the live path during judging |
| Embeddings | Gemini's embedding model | Free tier, generous throughput, no separate provider or key |

Practical notes:
- **No credit card is required anywhere in this table.** Get a Gemini API key from Google AI Studio in a couple of minutes.
- Gemini's free-tier rate limits move over time (Google has adjusted them more than once in the last year). Before you lock in your build, open your project in AI Studio and read the *live* per-minute and per-day numbers for your account — don't build against a number from a blog post, including this one.
- Use structured output (`responseMimeType: "application/json"` + `responseSchema`) for the Orchestrator and Critic — it's a free reliability upgrade over hoping the prompt's "output only JSON" instruction is obeyed every time.
- If you want a rough analogue to Claude's `effort` parameter for trading latency against depth, look at Gemini's thinking-budget controls in the current API docs — worth a quick read before you tune the Support and Critic agents.

**One distinction worth keeping straight:** the models above are what TechNova calls *at runtime*, through your own free Gemini API key. Antigravity — the tool actually writing your code — has its own, separate model choice for the coding agent itself (at the time of writing, a selection that includes Gemini 3.x Pro/Flash, Claude Sonnet, and GPT-OSS, though this list has changed before and will again — check the model picker in Antigravity's settings for what's current). That choice affects how well Antigravity writes your code; it has nothing to do with which model TechNova calls once it's built. Don't conflate the two.

---

## 11. Optional Paid Upgrade Path (Claude)

Skip this section entirely if the free stack in Section 10 is all you need — it will get you a fully working, judge-ready build. This section exists for teams who, after the hackathon (or with prize money in hand), want to see what a higher-end model does for answer quality and agentic reliability, and are fine spending real money to find out.

Anthropic's Claude API has **no free tier** — every account is metered from the first request, so this is a genuine cost, not a "free trial you might forget to cancel." Current pricing (verify at `docs.claude.com` before committing, since rates do change):

| Agent | Model | Price per million tokens (in/out) | Why you might pick it |
|---|---|---|---|
| Orchestrator | Claude Haiku 4.5 | $1 / $5 | Fastest, cheapest Claude tier; still meaningfully better classification accuracy on ambiguous messages than a Flash-Lite model |
| Support Agent | Claude Sonnet 5 | $2 / $10 introductory through Aug 31, 2026, then $3 / $15 standard | Anthropic's most agentic Sonnet to date — strong multi-step tool use and grounded generation |
| Critic Agent | Claude Sonnet 5 (or Claude Opus 4.8 at $5 / $25 for maximum rigor) | as above | Careful claim-by-claim verification benefits from a stronger reasoning model, though Sonnet 5 is a solid default |

The tool schemas in Section 6.2 translate directly — Claude's tool-use format is an `input_schema` object with the same JSON Schema shape shown for Gemini's `parameters`, just under a different key name. The system prompt skeletons don't need to change at all; they're provider-agnostic.

Anthropic doesn't ship its own embedding model — if you go this route for generation but want to stay consistent, their documented recommendation is Voyage AI (`voyage-3.5` or the lighter `voyage-3-lite`), or you can keep Gemini's free embeddings under a Claude-powered generation layer, since embeddings and generation don't have to come from the same provider.

**On FlowZint Credits:** the hackathon gives every participant 5,000 credits. Whether those are redeemable against an Anthropic bill, a different provider, or something inside FlowZint's own platform isn't something this document can confirm — check the portal's own API Reference and Integration Schedule pages before assuming they offset a Claude bill. Build on the free Gemini stack by default; treat Claude credits (FlowZint's or your own) as a bonus, not a dependency.

---

## 12. Features Beyond a Bare-Minimum Bot

| Feature | What it does | Priority |
|---|---|---|
| Public `/policies` page | Citation chips deep-link here — the same text the Critic checked | Core |
| Admin Playground | Test a query against a draft KB edit before publishing it | Core |
| Adjustable confidence threshold | Slider in `/admin/settings`, default 0.6, range 0.4–0.8 | Core |
| KB versioning | "Grounded in: Policy X v3" + a diff/history view | Core |
| Agent Assist (human-in-the-loop) | Ticket detail shows the AI's draft + confidence; human approves/edits | Core |
| Feedback loop | 👍/👎 on bot messages feeds CSAT in analytics | Stretch |
| Searchable trace/audit log | Full per-conversation log of every tool call and critic verdict, not just the live stream | Stretch |
| Sentiment-based escalation | Proactively escalate a frustrated customer even at high confidence | Stretch |
| Semantic response caching | Cache answers to repeated FAQs in Postgres; show cache-hit rate in analytics — also a free way to reduce how often you touch Gemini's per-minute rate limit | Stretch |
| Two-Stage Critic Cascade | Flash-Lite fast filter → Flash/Pro deep audit only on borderline cases | Stretch |
| PII redaction before logging | Strip obvious PII from stored transcripts | Stretch |

Pick 2–3 stretch features based on time remaining — don't try all of them. The semantic-caching one doubles as a free-tier protection measure, so it's worth prioritizing if your team is nervous about rate limits during the live demo.

---

## 13. Design System — "Anti-Gravity"

Tailwind CSS, deep glassmorphism (frosted blurs), floating cards with soft diffused shadows, overlapping z-axis depth, and Framer Motion for liquid page transitions and parallax. The Consumer Storefront stays airy and light-mode (Apple-like); the Admin Command Center stays dense and dark-mode (Vercel/Datadog-like).

One thing to plan for up front rather than retrofit: **heavy glassmorphism can quietly wreck text contrast.** Set a minimum opacity/blur combination that keeps body text at WCAG AA contrast against the frosted background before you theme every page, not after a judge squints at your demo.

---

## 14. Staying Inside the Free Tier: Operations Checklist

Three small, one-time setup tasks prevent the free tier's only real gotchas from showing up on judging day.

**1. Keep the Supabase project awake.** A free Supabase project pauses after 7 days with no database traffic. Since your GitHub repo is already required to be public (Section 16), a scheduled GitHub Actions workflow to ping it is free and takes about two minutes to set up:

```yaml
# .github/workflows/keep-supabase-alive.yml
name: Keep Supabase Alive
on:
  schedule:
    - cron: "0 8 */3 * *"   # every 3 days
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl -s "${{ secrets.SUPABASE_URL }}/rest/v1/" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -o /dev/null
```
Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` as repo secrets and this runs silently in the background for the rest of the hackathon — and forever after, for free.

**2. Watch the Gemini rate limit during rehearsal, not during judging.** Run through your full demo script once, end to end, the day before you present, and count how many Gemini calls it triggers. A hackathon demo of a handful of conversations is nowhere near the daily cap, but if judges are free to type their own test messages, a burst of rapid-fire questions could brush against the per-minute limit. If that's a concern, add simple client-side debouncing so double-clicks or fast repeated sends don't multiply calls unnecessarily.

**3. Confirm your GitHub repo and demo video are actually public before you submit.** Open both links in an incognito window with no session. This is the single most common reason for automatic rejection per the portal's own compliance warning — not an architecture problem, just a checkbox that's easy to forget under deadline pressure.

---

## 15. 17-Day Build Roadmap

Mapped to FlowZint's Day 8–24 build window (relative to your own registration date — confirm your cohort's actual calendar dates on the portal).

**Days 8–11 — Foundation.** Supabase schema + RLS policies + seed data (products, 12–15 orders across every status, KB policies). Auth for both roles. Next.js scaffold with both theme shells, deployed to Vercel early so the pipeline is proven end to end before you build on top of it. Storefront pages built as static/rule-based (no AI wired yet). Set up the GitHub Actions keep-alive workflow from Section 14 now, while it's fresh, not on day 23.

**Days 12–16 — Core AI Engine.** Get a free Gemini API key. Embed the KB with Gemini's embedding model and stand up hybrid search in Supabase. Build the single Edge Function that hosts the Orchestrator's classifier and conversation-state management. Wire all six Support Agent tools against seed data. Build the Critic's verdict schema and the confidence gate. Get `/support` working end to end through the Edge Function — this is your MVP demo path; protect it above everything else.

**Days 17–20 — Admin Command Center.** Live trace on `/admin/dashboard` over Supabase Realtime. Ticket Kanban + escalation generator. Knowledge-base CMS + versioning. Analytics charts.

**Days 21–24 — Polish + stretch buffer.** Cart/checkout flow, account dashboard. Pick 2–3 stretch features from Section 12 based on remaining time. Mobile-responsiveness and accessibility pass. Rehearse the demo script and count Gemini calls (Section 14, item 2). Record the demo video, write the README.

**Days 25–27 (Submission).** Public GitHub repo with a clean history, public demo video, submission form filled out. Triple-check every link is actually public — an accidentally-private repo is an automatic rejection, no exceptions.

---

## 16. Submission Checklist (FlowZint Requirements)

- [ ] GitHub repo is **public** — verify by opening the link in an incognito window
- [ ] Demo video is **public** (unlisted YouTube is fine as long as it plays without login)
- [ ] Project description is 50+ words and names your models/architecture/value (draft in Section 4)
- [ ] Category selected: Customer Care Bot (or Support Chat Bot)
- [ ] Team member details ready for the submission form: name, email, contact number, and organization/college for each member (up to 4), plus a participant type (student, startup, founder, CEO, or professional)

**Suggested README skeleton** (this is what "Documentation Clarity" is actually graded on):
1. Overview + the elevator pitch from Section 4
2. Architecture diagram (the ASCII flow in Section 5 is a fine starting point to redraw properly)
3. Tech stack table (Section 5), including a one-line note that the entire stack runs on free tiers
4. Agent roles — what each of the three does, in a sentence each
5. Setup instructions (env vars, `npm install`, Supabase project link, how to get a free Gemini API key)
6. Screenshots of `/support` and `/admin/dashboard`
7. Demo video link

---

## 17. Using This Document Inside Antigravity

1. Create a new Antigravity project pointed at an empty repo folder.
2. Paste this entire document as your first message, in **Planning mode** rather than Fast mode — let it produce a Plan Artifact (task breakdown) before it writes anything, and review that plan before approving it.
3. When Antigravity's setup screen asks which autonomy preset to use, pick **Agent-assisted development** — this is Google's own recommended default, and for a hackathon build it strikes the right balance: the agent handles safe automations on its own, but you stay in the loop at real decision points rather than either approving every single keystroke (Review-driven) or letting it run unsupervised end to end (Autopilot).
4. Build in the order of Section 15 as separate tasks dispatched from the **Manager view**, rather than one giant prompt — that view is built around tracking exactly this kind of sequential, multi-day task list, and you can run more than one agent in parallel once the foundation (Days 8–11) is down — for example, one agent on the admin dashboard while another handles the storefront's cart/checkout flow.
5. Ask it to verify each milestone by actually running the app in its integrated browser and screenshotting the result — that's the Artifact/walkthrough mechanism Antigravity is built around, and it's the fastest way to catch a broken `/support` flow or a silent 10-second timeout before you're two features deeper.
6. When you comment on a Plan Artifact or a walkthrough, be specific about the free-tier constraints in Section 2 — e.g. "this needs to run as a Supabase Edge Function, not a Vercel API route, because of the 10-second Hobby timeout." Antigravity reads inline comments and adjusts, but it can only respect a constraint you've actually told it about.
