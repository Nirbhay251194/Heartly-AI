import { NextResponse } from "next/server";
import { COMPANIONS } from "@/config/companions";

export async function GET() {
  return NextResponse.json({ success: true, data: { companions: COMPANIONS } });
}
