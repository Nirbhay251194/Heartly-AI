import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: false, message: "Analytics collection will be enabled with product analytics credentials." }, { status: 501 });
}
