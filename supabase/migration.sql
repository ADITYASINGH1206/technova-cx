-- ============================================================
-- TechNova CX Command Center — Supabase Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;       -- pgvector for embeddings
CREATE EXTENSION IF NOT EXISTS pg_trgm;      -- trigram for fuzzy search

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 2. PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Laptops', 'Phones', 'Headphones', 'Smartwatches')),
  brand TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  description TEXT NOT NULL DEFAULT '',
  specs JSONB NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL DEFAULT '',
  images TEXT[] DEFAULT '{}',
  rating NUMERIC NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'Processing' CHECK (status IN (
    'Processing', 'Shipped', 'Out for Delivery', 'Delivered',
    'Cancelled', 'Return Initiated', 'Returned/Refunded'
  )),
  tracking_number TEXT,
  carrier TEXT,
  estimated_delivery TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  total NUMERIC NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping_fee NUMERIC NOT NULL DEFAULT 0,
  discount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'UPI',
  shipping_address TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. ORDER ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY DEFAULT 'OI-' || floor(random() * 90000 + 10000)::text,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL,
  warranty_expires_on TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ============================================================
-- 5. KB POLICIES (Knowledge Base)
-- ============================================================
CREATE TABLE IF NOT EXISTS kb_policies (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN (
    'Returns & Refunds', 'Shipping & Delivery', 'Billing & Payments',
    'Warranty & Repairs', 'Replacement & Exchange', 'Order Cancellation',
    'Account & Security'
  )),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  is_published BOOLEAN NOT NULL DEFAULT true,
  embedding vector(768),  -- Gemini text-embedding-004 output
  search_vector tsvector, -- Full-text search
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_kb_search ON kb_policies USING gin(search_vector);

-- Vector similarity index (IVFFlat for <25 rows, small enough for exact scan too)
CREATE INDEX IF NOT EXISTS idx_kb_embedding ON kb_policies USING ivfflat (embedding vector_cosine_ops) WITH (lists = 4);

-- Auto-update tsvector on insert/update
CREATE OR REPLACE FUNCTION update_kb_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.body, '') || ' ' || COALESCE(NEW.category, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_kb_search_vector ON kb_policies;
CREATE TRIGGER trg_kb_search_vector
  BEFORE INSERT OR UPDATE ON kb_policies
  FOR EACH ROW EXECUTE FUNCTION update_kb_search_vector();

-- ============================================================
-- 6. CONVERSATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  customer_id UUID REFERENCES profiles(id),
  intent TEXT CHECK (intent IN ('SUPPORT', 'POLICY_FAQ', 'PRE_PURCHASE_REDIRECT', 'ESCALATE', 'UNCLEAR')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'escalated')),
  order_id_in_context TEXT,
  turn_count INTEGER NOT NULL DEFAULT 0,
  unresolved_turns INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ
);

-- ============================================================
-- 7. MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('customer', 'assistant', 'system')),
  content TEXT NOT NULL,
  citations JSONB DEFAULT '[]',
  critic_verdict JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id, created_at);

-- ============================================================
-- 8. TICKETS
-- ============================================================
CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  conversation_id TEXT REFERENCES conversations(id),
  customer_id UUID REFERENCES profiles(id),
  order_id TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Product Quality', 'Delivery Delay', 'Billing', 'Service',
    'Warranty', 'Return', 'Replacement', 'Other'
  )),
  reason_for_escalation TEXT CHECK (reason_for_escalation IN (
    'low_confidence', 'hard_trigger_refund', 'hard_trigger_legal',
    'hard_trigger_security', 'customer_request', 'unresolved_turns',
    'negative_sentiment'
  )),
  critic_confidence NUMERIC,
  transcript JSONB DEFAULT '[]',
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  assigned_to UUID REFERENCES profiles(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 9. FEEDBACK
-- ============================================================
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY DEFAULT 'FB-' || floor(random() * 90000 + 10000)::text,
  message_id TEXT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  rating TEXT NOT NULL CHECK (rating IN ('up', 'down')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 10. ANALYTICS EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY DEFAULT 'AE-' || floor(random() * 900000 + 100000)::text,
  type TEXT NOT NULL CHECK (type IN (
    'conversation_started', 'conversation_resolved', 'conversation_escalated',
    'tool_called', 'critic_pass', 'critic_fail', 'feedback_received', 'cache_hit'
  )),
  payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(type, created_at);

-- ============================================================
-- RLS POLICIES
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Products: everyone can read
CREATE POLICY "Products are public" ON products FOR SELECT USING (true);

-- KB Policies: published ones are public
CREATE POLICY "Published policies are public" ON kb_policies FOR SELECT USING (is_published = true);
CREATE POLICY "Admins manage all policies" ON kb_policies FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Orders: customers see own, admins see all
CREATE POLICY "Customers see own orders" ON orders FOR SELECT USING (
  customer_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Order Items: via order access
CREATE POLICY "Order items follow order access" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (
      orders.customer_id = auth.uid() OR
      EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    )
  )
);

-- Conversations: customers see own, admins see all
CREATE POLICY "Customers see own conversations" ON conversations FOR SELECT USING (
  customer_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Conversations insert" ON conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Conversations update" ON conversations FOR UPDATE USING (true);

-- Messages: via conversation access
CREATE POLICY "Messages follow conversation access" ON messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND (
      conversations.customer_id = auth.uid() OR
      EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
    )
  )
);
CREATE POLICY "Messages insert" ON messages FOR INSERT WITH CHECK (true);

-- Tickets: admins see all
CREATE POLICY "Admins see all tickets" ON tickets FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Tickets insert" ON tickets FOR INSERT WITH CHECK (true);

-- Profiles: users see own, admins see all
CREATE POLICY "Users see own profile" ON profiles FOR SELECT USING (
  id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Feedback: anyone can insert
CREATE POLICY "Feedback insert" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Feedback select" ON feedback FOR SELECT USING (true);

-- Analytics: admins only
CREATE POLICY "Admins see analytics" ON analytics_events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
CREATE POLICY "Analytics insert" ON analytics_events FOR INSERT WITH CHECK (true);

-- ============================================================
-- HYBRID SEARCH FUNCTION (pgvector + tsvector + RRF)
-- ============================================================
CREATE OR REPLACE FUNCTION hybrid_search_policies(
  query_embedding vector(768),
  query_text TEXT,
  match_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  id TEXT,
  category TEXT,
  title TEXT,
  body TEXT,
  version INTEGER,
  rrf_score DOUBLE PRECISION
)
LANGUAGE sql STABLE
AS $$
  WITH semantic_search AS (
    SELECT
      kb_policies.id,
      ROW_NUMBER() OVER (ORDER BY kb_policies.embedding <=> query_embedding) AS rank_ix
    FROM kb_policies
    WHERE kb_policies.is_published = true
      AND kb_policies.embedding IS NOT NULL
    ORDER BY kb_policies.embedding <=> query_embedding
    LIMIT match_count * 2
  ),
  keyword_search AS (
    SELECT
      kb_policies.id,
      ROW_NUMBER() OVER (ORDER BY ts_rank(kb_policies.search_vector, websearch_to_tsquery('english', query_text)) DESC) AS rank_ix
    FROM kb_policies
    WHERE kb_policies.is_published = true
      AND kb_policies.search_vector @@ websearch_to_tsquery('english', query_text)
    ORDER BY ts_rank(kb_policies.search_vector, websearch_to_tsquery('english', query_text)) DESC
    LIMIT match_count * 2
  ),
  rrf AS (
    SELECT
      COALESCE(s.id, k.id) AS id,
      -- Reciprocal Rank Fusion: 1/(k+rank) for both, with k=60 as standard
      COALESCE(1.0 / (60 + s.rank_ix), 0.0) +
      COALESCE(1.0 / (60 + k.rank_ix), 0.0) AS score
    FROM semantic_search s
    FULL OUTER JOIN keyword_search k ON s.id = k.id
  )
  SELECT
    kb_policies.id,
    kb_policies.category,
    kb_policies.title,
    kb_policies.body,
    kb_policies.version,
    rrf.score AS rrf_score
  FROM rrf
  JOIN kb_policies ON kb_policies.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
$$;
