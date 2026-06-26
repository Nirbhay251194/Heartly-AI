import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: false, message: "Memory persistence requires Supabase credentials." }, { status: 501 });
}
