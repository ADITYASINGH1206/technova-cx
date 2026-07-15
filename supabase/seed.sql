-- ============================================================
-- TechNova CX Command Center — Seed Data
-- Run this AFTER migration.sql in the Supabase SQL Editor
-- ============================================================

-- ============================================================
-- PRODUCTS (25 products across 4 categories)
-- ============================================================
INSERT INTO products (id, name, category, brand, price, original_price, description, specs, rating, review_count, in_stock, featured) VALUES
-- Laptops (7)
('PRD-001', 'TechNova ProBook X16', 'Laptops', 'TechNova', 89999, 109999, 'Flagship 16" laptop with M-series chip, 32GB RAM, and all-day battery life. Built for creators and developers.', '{"Processor":"TechNova M3 Pro","RAM":"32GB Unified","Storage":"1TB SSD","Display":"16\" Liquid Retina XDR","Battery":"22 hours"}', 4.8, 2847, true, true),
('PRD-002', 'ZenBook Ultra 14', 'Laptops', 'ASUS', 74999, 84999, 'Ultra-slim 14" OLED laptop with Intel Core Ultra processor, stunning color accuracy, and thunderbolt connectivity.', '{"Processor":"Intel Core Ultra 7","RAM":"16GB LPDDR5x","Storage":"512GB SSD","Display":"14\" 2.8K OLED","Battery":"15 hours"}', 4.6, 1923, true, true),
('PRD-003', 'ThinkPad X1 Carbon Gen 12', 'Laptops', 'Lenovo', 134999, null, 'Enterprise-grade ultrabook with military-spec durability, exceptional keyboard, and unmatched security features.', '{"Processor":"Intel Core Ultra 9","RAM":"32GB LPDDR5x","Storage":"1TB SSD","Display":"14\" 2.8K OLED","Battery":"18 hours"}', 4.7, 3102, true, false),
('PRD-004', 'Swift Edge 16', 'Laptops', 'Acer', 62999, 69999, '16" OLED display with AMD Ryzen processor, ultra-lightweight magnesium-aluminum chassis under 1.2kg.', '{"Processor":"AMD Ryzen 7 8840U","RAM":"16GB LPDDR5","Storage":"512GB SSD","Display":"16\" 3.2K OLED","Battery":"12 hours"}', 4.4, 876, true, false),
('PRD-005', 'Galaxy Book4 Ultra', 'Laptops', 'Samsung', 159999, null, 'Premium 16" laptop with discrete NVIDIA graphics, ideal for AI workloads and creative professionals.', '{"Processor":"Intel Core Ultra 9","RAM":"32GB LPDDR5x","Storage":"1TB SSD","Display":"16\" 3K AMOLED","GPU":"NVIDIA RTX 4070"}', 4.5, 654, true, false),
('PRD-006', 'Creator Z16 HX Studio', 'Laptops', 'MSI', 189999, 219999, 'Workstation-class laptop with Mini LED display, calibrated for professional color work and 3D rendering.', '{"Processor":"Intel Core i9-14900HX","RAM":"64GB DDR5","Storage":"2TB SSD","Display":"16\" Mini LED QHD+","GPU":"NVIDIA RTX 4080"}', 4.6, 412, true, false),
('PRD-007', 'TechNova AirBook 13', 'Laptops', 'TechNova', 54999, 64999, 'Ultra-portable 13" laptop perfect for students and everyday productivity. Fanless design, all-day battery.', '{"Processor":"TechNova M3","RAM":"16GB Unified","Storage":"256GB SSD","Display":"13.6\" Liquid Retina","Battery":"18 hours"}', 4.5, 5231, true, true),

-- Phones (7)
('PRD-008', 'TechNova Prism Pro', 'Phones', 'TechNova', 79999, 89999, 'Flagship phone with computational photography engine, titanium frame, and AI-powered features throughout.', '{"Chipset":"TechNova A18 Pro","RAM":"8GB","Storage":"256GB","Display":"6.7\" Super Retina XDR","Camera":"48MP Triple","Battery":"4685 mAh"}', 4.7, 8934, true, true),
('PRD-009', 'Pixel 9 Pro', 'Phones', 'Google', 84999, null, 'Google''s most advanced phone with the best camera system, 7 years of updates, and Gemini Nano on-device AI.', '{"Chipset":"Tensor G4","RAM":"16GB","Storage":"256GB","Display":"6.7\" LTPO OLED","Camera":"50MP Triple + 5x Zoom","Battery":"5060 mAh"}', 4.8, 6721, true, true),
('PRD-010', 'iPhone 16 Pro', 'Phones', 'Apple', 134999, null, 'A18 Pro chip, 48MP camera system with 5x optical zoom, titanium design, and Apple Intelligence features.', '{"Chipset":"A18 Pro","RAM":"8GB","Storage":"256GB","Display":"6.7\" Super Retina XDR","Camera":"48MP Triple + 5x Zoom","Battery":"4685 mAh"}', 4.8, 12453, true, false),
('PRD-011', 'OnePlus 13', 'Phones', 'OnePlus', 59999, 64999, 'Flagship killer with Snapdragon 8 Elite, 100W charging, Hasselblad camera tuning, and OxygenOS 15.', '{"Chipset":"Snapdragon 8 Elite","RAM":"12GB","Storage":"256GB","Display":"6.82\" 2K LTPO AMOLED","Camera":"50MP Triple Hasselblad","Battery":"6000 mAh"}', 4.6, 4532, true, false),
('PRD-012', 'Galaxy S25 Ultra', 'Phones', 'Samsung', 129999, null, 'Samsung''s AI flagship with S Pen, 200MP camera, titanium frame, and Galaxy AI features.', '{"Chipset":"Snapdragon 8 Elite","RAM":"12GB","Storage":"256GB","Display":"6.9\" QHD+ AMOLED","Camera":"200MP Quad","Battery":"5000 mAh"}', 4.7, 7821, true, false),
('PRD-013', 'Nothing Phone (3)', 'Phones', 'Nothing', 34999, 39999, 'Transparent design with Glyph interface, clean software, and flagship-level Snapdragon performance.', '{"Chipset":"Snapdragon 8s Gen 3","RAM":"8GB","Storage":"128GB","Display":"6.7\" LTPO OLED","Camera":"50MP Dual","Battery":"5000 mAh"}', 4.3, 2341, true, false),
('PRD-014', 'TechNova Prism SE', 'Phones', 'TechNova', 44999, 49999, 'The essential TechNova phone — same premium build quality and software, optimized for value.', '{"Chipset":"TechNova A17","RAM":"6GB","Storage":"128GB","Display":"6.1\" OLED","Camera":"48MP Dual","Battery":"4000 mAh"}', 4.4, 3876, true, false),

-- Headphones (6)
('PRD-015', 'TechNova AuraMax Pro', 'Headphones', 'TechNova', 29999, 34999, 'Flagship over-ear headphones with adaptive ANC, spatial audio, and 40-hour battery life.', '{"Driver":"40mm custom","ANC":"Adaptive","Battery":"40 hours","Connectivity":"Bluetooth 5.3 + 3.5mm","Weight":"250g"}', 4.8, 5643, true, true),
('PRD-016', 'AirPods Pro 3', 'Headphones', 'Apple', 24999, null, 'Next-gen AirPods with H3 chip, hearing health features, USB-C, and best-in-class transparency mode.', '{"Driver":"Custom H3","ANC":"Active","Battery":"6h buds / 30h case","Connectivity":"Bluetooth 5.3","Weight":"5.3g per bud"}', 4.7, 9876, true, false),
('PRD-017', 'WH-1000XM6', 'Headphones', 'Sony', 27999, 32999, 'Industry-leading noise cancellation with LDAC, 30mm driver, and improved multipoint connectivity.', '{"Driver":"30mm","ANC":"Industry-leading","Battery":"40 hours","Connectivity":"Bluetooth 5.3 LDAC","Weight":"227g"}', 4.8, 7234, true, true),
('PRD-018', 'TechNova BudsAir 3', 'Headphones', 'TechNova', 4999, 6999, 'True wireless earbuds with ANC, 28-hour total battery, IP54 water resistance, and low-latency gaming mode.', '{"Driver":"12.4mm","ANC":"Active","Battery":"7h buds / 28h case","Connectivity":"Bluetooth 5.3","Weight":"4.7g per bud"}', 4.3, 12453, true, true),
('PRD-019', 'QuietComfort Ultra', 'Headphones', 'Bose', 32999, null, 'Bose''s premium over-ear with spatial audio, CustomTune EQ, and world-class noise cancellation.', '{"Driver":"35mm Triport","ANC":"World-class","Battery":"24 hours","Connectivity":"Bluetooth 5.3","Weight":"250g"}', 4.6, 4532, true, false),
('PRD-020', 'JBL Tour One M3', 'Headphones', 'JBL', 19999, 24999, 'Premium wireless headphones with True Adaptive ANC, Hi-Res Audio, and JBL Personi-Fi 3.0 tuning.', '{"Driver":"40mm","ANC":"True Adaptive","Battery":"50 hours","Connectivity":"Bluetooth 5.3","Weight":"268g"}', 4.4, 2341, true, false),

-- Smartwatches (5)
('PRD-021', 'TechNova Pulse Ultra', 'Smartwatches', 'TechNova', 44999, 49999, 'Titanium smartwatch with advanced health monitoring, 72-hour battery, and rugged outdoor features.', '{"Display":"1.92\" LTPO AMOLED","Battery":"72 hours","Sensors":"SpO2, ECG, Temperature","Water Resistance":"100m","Weight":"52g"}', 4.7, 3456, true, true),
('PRD-022', 'Galaxy Watch 7 Ultra', 'Smartwatches', 'Samsung', 54999, null, 'Samsung''s most durable smartwatch with dual-frequency GPS, titanium build, and Wear OS 5.', '{"Display":"1.47\" AMOLED","Battery":"60 hours","Sensors":"BioActive, GPS","Water Resistance":"100m + 10ATM","Weight":"60g"}', 4.5, 2187, true, false),
('PRD-023', 'Apple Watch Ultra 3', 'Smartwatches', 'Apple', 89999, null, 'The ultimate adventure watch with S10 chip, satellite connectivity, and depth gauge for diving.', '{"Display":"1.92\" OLED","Battery":"72 hours","Sensors":"SpO2, ECG, Depth, Temperature","Water Resistance":"100m EN13319","Weight":"61.4g"}', 4.8, 5678, true, false),
('PRD-024', 'Amazfit T-Rex Ultra 2', 'Smartwatches', 'Amazfit', 19999, 24999, 'Military-grade rugged smartwatch with dual-band GPS, 20-day battery, and 160+ sport modes.', '{"Display":"1.43\" AMOLED","Battery":"20 days","Sensors":"SpO2, Heart Rate","Water Resistance":"100m","Weight":"65g"}', 4.3, 4321, true, false),
('PRD-025', 'TechNova Pulse SE', 'Smartwatches', 'TechNova', 14999, 19999, 'Affordable smartwatch with health tracking essentials, 7-day battery, and swim-proof design.', '{"Display":"1.78\" AMOLED","Battery":"7 days","Sensors":"SpO2, Heart Rate, Sleep","Water Resistance":"50m","Weight":"38g"}', 4.4, 7654, true, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ORDERS (15 orders across all statuses)
-- Using a demo customer ID (you'll update this after creating the demo user)
-- ============================================================

-- First create a demo customer profile (no auth user, just for seed data)
INSERT INTO profiles (id, role, name, email, phone, address)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'customer',
  'Ananya Sharma',
  'ananya@demo.com',
  '+91 98765 43210',
  '42 MG Road, Bengaluru, Karnataka 560001'
) ON CONFLICT (id) DO NOTHING;

-- Demo admin
INSERT INTO profiles (id, role, name, email)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'admin',
  'Admin',
  'admin@technova.com'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO orders (id, customer_id, status, tracking_number, carrier, estimated_delivery, delivered_at, total, subtotal, shipping_fee, discount, payment_method, shipping_address, created_at) VALUES
('ORD-7734', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521890', 'BlueDart', '2026-06-20', '2026-06-19', 89999, 89999, 0, 0, 'UPI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-06-15'),
('ORD-7735', '00000000-0000-0000-0000-000000000001', 'Shipped', 'TN8834521891', 'Delhivery', '2026-07-18', null, 79999, 89999, 0, 10000, 'Credit Card', '42 MG Road, Bengaluru, Karnataka 560001', '2026-07-10'),
('ORD-7736', '00000000-0000-0000-0000-000000000001', 'Processing', null, null, '2026-07-22', null, 74999, 74999, 0, 0, 'UPI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-07-13'),
('ORD-7737', '00000000-0000-0000-0000-000000000001', 'Out for Delivery', 'TN8834521893', 'DTDC', '2026-07-15', null, 29999, 34999, 0, 5000, 'Net Banking', '42 MG Road, Bengaluru, Karnataka 560001', '2026-07-08'),
('ORD-7738', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521894', 'BlueDart', '2026-05-20', '2026-05-19', 134999, 134999, 0, 0, 'EMI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-05-12'),
('ORD-7739', '00000000-0000-0000-0000-000000000001', 'Cancelled', null, null, null, null, 54999, 64999, 0, 10000, 'UPI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-07-11'),
('ORD-7740', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521896', 'Delhivery', '2026-06-05', '2026-06-04', 4999, 6999, 0, 2000, 'UPI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-05-28'),
('ORD-7741', '00000000-0000-0000-0000-000000000001', 'Return Initiated', 'TN8834521897', 'BlueDart', '2026-07-01', '2026-06-30', 62999, 69999, 0, 7000, 'Credit Card', '42 MG Road, Bengaluru, Karnataka 560001', '2026-06-22'),
('ORD-7742', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521898', 'DTDC', '2026-04-15', '2026-04-14', 44999, 49999, 0, 5000, 'UPI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-04-08'),
('ORD-7743', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521899', 'BlueDart', '2026-03-10', '2026-03-09', 24999, 24999, 0, 0, 'Net Banking', '42 MG Road, Bengaluru, Karnataka 560001', '2026-03-02'),
('ORD-7744', '00000000-0000-0000-0000-000000000001', 'Returned/Refunded', 'TN8834521900', 'Delhivery', '2026-06-25', '2026-06-24', 34999, 39999, 0, 5000, 'UPI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-06-18'),
('ORD-7745', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521901', 'BlueDart', '2026-05-05', '2026-05-04', 159999, 159999, 0, 0, 'EMI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-04-28'),
('ORD-7746', '00000000-0000-0000-0000-000000000001', 'Shipped', 'TN8834521902', 'DTDC', '2026-07-20', null, 19999, 24999, 0, 5000, 'Credit Card', '42 MG Road, Bengaluru, Karnataka 560001', '2026-07-12'),
('ORD-7747', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521903', 'Delhivery', '2026-02-15', '2026-02-14', 14999, 19999, 0, 5000, 'UPI', '42 MG Road, Bengaluru, Karnataka 560001', '2026-02-08'),
('ORD-7748', '00000000-0000-0000-0000-000000000001', 'Delivered', 'TN8834521904', 'BlueDart', '2026-01-20', '2026-01-19', 84999, 84999, 0, 0, 'Net Banking', '42 MG Road, Bengaluru, Karnataka 560001', '2026-01-12')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ORDER ITEMS (matching each order to products)
-- ============================================================
INSERT INTO order_items (id, order_id, product_id, product_name, quantity, price, warranty_expires_on) VALUES
('OI-10001', 'ORD-7734', 'PRD-001', 'TechNova ProBook X16', 1, 89999, '2027-06-15'),
('OI-10002', 'ORD-7735', 'PRD-008', 'TechNova Prism Pro', 1, 79999, '2027-07-10'),
('OI-10003', 'ORD-7736', 'PRD-002', 'ZenBook Ultra 14', 1, 74999, null),
('OI-10004', 'ORD-7737', 'PRD-015', 'TechNova AuraMax Pro', 1, 29999, '2027-01-08'),
('OI-10005', 'ORD-7738', 'PRD-003', 'ThinkPad X1 Carbon Gen 12', 1, 134999, '2027-05-12'),
('OI-10006', 'ORD-7739', 'PRD-007', 'TechNova AirBook 13', 1, 54999, null),
('OI-10007', 'ORD-7740', 'PRD-018', 'TechNova BudsAir 3', 1, 4999, '2026-11-28'),
('OI-10008', 'ORD-7741', 'PRD-004', 'Swift Edge 16', 1, 62999, '2027-06-22'),
('OI-10009', 'ORD-7742', 'PRD-021', 'TechNova Pulse Ultra', 1, 44999, '2027-04-08'),
('OI-10010', 'ORD-7743', 'PRD-016', 'AirPods Pro 3', 1, 24999, '2026-09-02'),
('OI-10011', 'ORD-7744', 'PRD-013', 'Nothing Phone (3)', 1, 34999, '2027-06-18'),
('OI-10012', 'ORD-7745', 'PRD-005', 'Galaxy Book4 Ultra', 1, 159999, '2027-04-28'),
('OI-10013', 'ORD-7746', 'PRD-020', 'JBL Tour One M3', 1, 19999, null),
('OI-10014', 'ORD-7747', 'PRD-025', 'TechNova Pulse SE', 1, 14999, '2027-02-08'),
('OI-10015', 'ORD-7748', 'PRD-009', 'Pixel 9 Pro', 1, 84999, '2027-01-12')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- KB POLICIES (15 policy snippets across 7 categories)
-- Embeddings will be populated via the /api/embed endpoint
-- ============================================================
INSERT INTO kb_policies (id, category, title, body, version) VALUES
-- Returns & Refunds
('RR-001', 'Returns & Refunds', 'Return Window', 'Products can be returned within 7 days of delivery. The item must be unused, in its original packaging, with all accessories and tags intact. Digital products and opened software are non-returnable.', 2),
('RR-002', 'Returns & Refunds', 'Refund Processing', 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund is credited to the original payment method. UPI refunds are typically faster (2-3 business days).', 2),
('RR-003', 'Returns & Refunds', 'Non-Returnable Items', 'The following items cannot be returned: earbuds/headphones with broken hygiene seals, software licenses, gift cards, and items damaged by the customer. Items purchased during flash sales with ''No Return'' tags are final sale.', 1),

-- Shipping & Delivery
('SD-001', 'Shipping & Delivery', 'Delivery Timeline', 'Standard shipping takes 3-7 business days depending on your location. Metro cities (Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata) typically receive orders within 3-4 business days. Remote areas may take up to 10 business days.', 3),
('SD-002', 'Shipping & Delivery', 'Free Shipping Policy', 'Free shipping is available on all orders above ₹999. Orders below ₹999 incur a flat shipping fee of ₹99. Express shipping (1-2 business days) is available in select metros for an additional ₹299.', 2),
('SD-003', 'Shipping & Delivery', 'Shipping Partners', 'We ship through BlueDart, Delhivery, and DTDC. Tracking information is shared via email and SMS once the order is dispatched. You can also track your order from the Account Dashboard.', 1),

-- Billing & Payments
('BP-001', 'Billing & Payments', 'Accepted Payment Methods', 'We accept UPI (Google Pay, PhonePe, Paytm), credit cards (Visa, Mastercard, Amex, RuPay), debit cards, net banking (all major banks), and EMI options on select cards. Cash on Delivery (COD) is available for orders up to ₹50,000.', 2),
('BP-002', 'Billing & Payments', 'EMI Options', 'No-cost EMI is available on select products for 3, 6, and 9-month tenures on HDFC, ICICI, SBI, and Axis credit cards. Standard EMI with interest is available on all other supported cards. EMI processing fee may apply.', 1),

-- Warranty & Repairs
('WR-001', 'Warranty & Repairs', 'Standard Warranty Coverage', 'Laptops, Phones, and Smartwatches carry a 12-month manufacturer warranty from the date of purchase. Headphones carry a 6-month warranty. Warranty covers manufacturing defects and hardware failures under normal use.', 2),
('WR-002', 'Warranty & Repairs', 'Warranty Exclusions', 'Warranty does not cover: physical damage (drops, water damage, screen cracks), damage from unauthorized modifications or repairs, normal wear and tear (battery degradation, cosmetic scratches), or accessories (chargers, cables, cases).', 2),
('WR-003', 'Warranty & Repairs', 'Warranty Claim Process', 'To file a warranty claim: (1) Contact NexaBot with your order ID, (2) describe the issue, (3) NexaBot will verify your warranty status and create a claim ticket, (4) you''ll receive a prepaid return label, (5) ship the item, (6) we inspect and repair/replace within 7-10 business days.', 3),

-- Replacement & Exchange
('RE-001', 'Replacement & Exchange', 'Replacement Policy', 'If you receive a defective or damaged product, you can request a replacement within 48 hours of delivery. Photo evidence of the defect/damage is required. Replacement is subject to stock availability — if unavailable, a full refund is processed.', 2),
('RE-002', 'Replacement & Exchange', 'Exchange Policy', 'Product exchanges (e.g., different color or variant) are available within 7 days of delivery for select categories. The item must be unused and in original packaging. Price differences are adjusted via the original payment method.', 1),

-- Order Cancellation
('OC-001', 'Order Cancellation', 'Cancellation Window', 'Orders can be cancelled within 2 hours of placement or before the order status changes to ''Shipped'', whichever comes first. Once an order is shipped, it cannot be cancelled — you may refuse delivery or initiate a return after delivery.', 2),
('OC-002', 'Order Cancellation', 'Cancellation Refund', 'Cancelled orders are refunded within 3-5 business days to the original payment method. COD orders that are cancelled have no refund to process. Prepaid cancellations receive a full refund including any shipping charges paid.', 1),

-- Account & Security
('AS-001', 'Account & Security', 'Account Security', 'Your TechNova account is protected with industry-standard encryption. We recommend using a strong, unique password and enabling two-factor authentication (2FA) when available. Never share your login credentials or OTP with anyone.', 2),
('AS-002', 'Account & Security', 'Data Privacy', 'We collect only the data necessary to process orders and provide support. Your personal information is never sold to third parties. You can request account data export or deletion by contacting support. Full privacy policy is available on our website.', 1)
ON CONFLICT (id) DO NOTHING;
