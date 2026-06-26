import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: false, message: "Profile lookup requires Supabase credentials." }, { status: 501 });
}
