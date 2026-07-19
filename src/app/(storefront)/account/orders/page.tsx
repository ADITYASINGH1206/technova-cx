import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Fetch orders from Supabase server-side
async function fetchOrders() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch orders and their items using a join
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        product_name,
        quantity,
        price
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  return orders || [];
}

export default async function AccountOrdersPage() {
  const orders = await fetchOrders();

  return (
    <div className="py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0">
        <GlassCard className="sticky top-32 space-y-4">
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link href="/account/dashboard" className="px-4 py-2 hover:bg-white/50 dark:bg-slate-800/50 rounded-lg transition-colors">Dashboard</Link>
            <Link href="/account/orders" className="px-4 py-2 bg-[var(--color-sf-primary)]/10 text-[var(--color-sf-primary)] rounded-lg">Order History</Link>
            <Link href="/account/settings" className="px-4 py-2 hover:bg-white/50 dark:bg-slate-800/50 rounded-lg transition-colors">Settings</Link>
          </nav>
        </GlassCard>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-sf-foreground)]">Order History</h1>
        
        {orders.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <h2 className="text-xl font-bold mb-2">No orders found</h2>
            <p className="opacity-70 mb-6">You haven't placed any orders yet.</p>
            <Link href="/shop" className="px-6 py-3 bg-[var(--color-sf-primary)] text-white rounded-xl font-bold">
              Start Shopping
            </Link>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <GlassCard key={order.id} className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold">Order #{order.id}</h3>
                    <p className="text-xs opacity-60">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(order.total || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    <span className={`inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>
                
                <hr className="border-[var(--color-sf-border)] my-4" />
                
                <div className="space-y-3">
                  {order.order_items?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/40 dark:bg-slate-800/40 rounded flex shrink-0 items-center justify-center">
                        <span className="text-[10px] opacity-40">Img</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.product_name || "Product"}</p>
                        <p className="text-xs opacity-60">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Link href={`/account/orders/${order.id}`} className="px-4 py-2 bg-white/60 dark:bg-slate-800/60 text-sm font-bold rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors border border-[var(--color-sf-border)] text-center">
                    Track Package
                  </Link>
                  <button className="px-4 py-2 text-sm font-bold text-[var(--color-sf-primary)] hover:underline">
                    View Invoice
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
