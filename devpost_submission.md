# TechNova CX: Enterprise-Grade AI Customer Experience Platform

### Inspiration
Traditional customer support chatbots are fundamentally broken. They rely on single-prompt architectures that hallucinate company policies, trap users in frustrating automated loops, and offer zero transparency to the human support teams that inevitably have to clean up the mess. We built **TechNova CX** to solve this burnout—creating an AI support platform that doesn't just guess, but strictly verifies its own answers before it speaks.

### What it does
TechNova CX is a smart storefront and AI support ecosystem. For the **customer**, it provides instant, highly-accurate answers with deep-linked citations to public policies, and an interactive trace drawer to see exactly how the AI arrived at its conclusion. For the **admin**, it provides an Agent Assist Portal where complex queries are smoothly escalated, bringing the full conversation history and an AI-drafted reply directly to human agents for one-click approval.

### How we built it
We utilized a cutting-edge **3-Agent Pipeline** powered by **Google Gemini**:
1. **The Orchestrator (`gemini-2.5-flash-lite`):** Acts as the traffic controller, performing rapid 5-way intent classification.
2. **The Support Agent (`gemini-2.5-flash`):** Uses function calling to execute multi-round queries against live Supabase tables (checking order status, warranties, and return eligibility).
3. **The Critic Agent (`gemini-2.5-flash`):** Acts as a zero-hallucination fact-checker.

For knowledge retrieval, we implemented a **Hybrid RAG** system in Supabase, combining `pgvector` semantic search with PostgreSQL `tsvector` keyword search via Reciprocal Rank Fusion (RRF). The entire frontend is built on Next.js 15, React 19, and Tailwind CSS, featuring dual-theme layouts (Glassmorphism storefront vs. OLED admin center).

### Challenges we ran into
Building a self-correcting agent pipeline brought significant challenges. Navigating multi-agent state management required us to carefully isolate conversation history while passing strict JSON state objects between the Orchestrator and Support agents. Additionally, tuning the Critic agent to output strict JSON schemas for evaluating factual claims required aggressive prompt engineering to ensure it didn't hallucinate its own verdicts. Finally, we had to heavily optimize the pipeline to ensure latency remained low despite running multiple LLM calls per customer turn.

### Accomplishments that we're proud of
- **Zero-Hallucination Guardrails:** Successfully implementing the Critic Agent with a strict `0.6` confidence gate that safely catches unverified claims and escalates them automatically.
- **Real-Time Observability:** Building the `⚡ View AI Trace` drawer, which exposes the AI's internal monologue and tool usage to users.
- **End-to-End Deep Linking:** Citations in chat dynamically anchor directly to the relevant sections in the public Trust Center.

### What's next for TechNova CX
Our immediate roadmap involves deploying TechNova CX to omnichannel environments like WhatsApp and Slack. We also plan to integrate real-time voice-agent capabilities using Gemini's multimodal features and introduce automated SLA tracking in the admin portal to measure how effectively the Agent Assist drafts reduce human resolution times.
