import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { products } from "@/lib/seed-data";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from('products').upsert(products);

    if (error) {
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json({ success: true, count: products.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
