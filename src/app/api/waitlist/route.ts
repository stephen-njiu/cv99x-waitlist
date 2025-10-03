import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, 
  { auth: { persistSession: false } }
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic required fields
    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim().toLowerCase();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // Honeypot check: ignore bots but return OK
    if (body?.botField) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Only upsert the expected columns
    const row = {
      name,
      email,
      frustration: body?.frustration ?? null,
      dream: body?.dream ?? null,
      priceRange: body?.priceRange ?? null,
      paymentStyle: body?.paymentStyle ?? null,
      heardFrom: body?.heardFrom ?? null, 
      botField: body?.botField ?? '',
      source: body?.source ?? "cv99x-waitlist",
      updated_at: new Date().toISOString(), 
    };

    // Upsert by unique email
    const { data, error } = await supabase
      .from("waitlist")
      .upsert(row, { onConflict: "email" })
      .select()
       .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}