"use server";

import { createClient } from "@supabase/supabase-js";

// We use the SERVICE_ROLE_KEY here to bypass RLS securely on the server.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function processCheckout(orderId: string, items: any[], finalTotal: number, subtotal: number, tax: number) {
  try {
    // 1. Insert Order
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_id: null,
        status: 'Processing',
        tracking_number: null,
        carrier: null,
        total: finalTotal,
        subtotal: subtotal
      });

    if (orderError) throw new Error(orderError.message);

    // 2. Insert Order Items
    const orderItemsToInsert = items.map(item => ({
      order_id: orderId,
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
      // Mocking 1 year warranty from today
      warranty_expires_on: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) throw new Error(itemsError.message);

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Checkout Error:", error);
    return { success: false, error: error.message };
  }
}
