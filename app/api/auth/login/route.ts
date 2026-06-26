import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: false, message: "Auth integration requires Supabase credentials." }, { status: 501 });
}
