import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: false, message: "Payment requests require admin workflow integration." }, { status: 501 });
}
