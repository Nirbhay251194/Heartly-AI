import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: false, message: "Admin data requires Supabase credentials." }, { status: 501 });
}
