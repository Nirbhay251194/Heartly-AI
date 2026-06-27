import { NextResponse } from "next/server";
import { getAuthContext, isAdminEmail } from "@/services/auth";
import { getAdminSnapshot, updatePaymentStatus } from "@/services/database";
import type { PaymentStatus } from "@/types/database";

export async function GET(request: Request) {
  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required." }, { status: 401 });
    }

    if (!isAdminEmail(auth.profile.email)) {
      return NextResponse.json({ success: false, message: "Admin access is required." }, { status: 403 });
    }

    const snapshot = await getAdminSnapshot();
    return NextResponse.json({ success: true, data: snapshot });
  } catch (error) {
    console.error("Admin snapshot failed", error);
    return NextResponse.json({ success: false, message: "Could not load admin dashboard." }, { status: 500 });
  }
}

interface AdminActionBody {
  paymentRequestId?: string;
  status?: PaymentStatus;
  notes?: string;
}

export async function PATCH(request: Request) {
  let body: AdminActionBody;

  try {
    body = (await request.json()) as AdminActionBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  if (!body.paymentRequestId || (body.status !== "APPROVED" && body.status !== "REJECTED")) {
    return NextResponse.json({ success: false, message: "Payment request and status are required." }, { status: 400 });
  }

  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required." }, { status: 401 });
    }

    if (!isAdminEmail(auth.profile.email)) {
      return NextResponse.json({ success: false, message: "Admin access is required." }, { status: 403 });
    }

    const paymentRequest = await updatePaymentStatus({
      paymentRequestId: body.paymentRequestId,
      status: body.status,
      admin: auth.user,
      notes: body.notes
    });

    return NextResponse.json({ success: true, data: { paymentRequest } });
  } catch (error) {
    console.error("Admin payment update failed", error);
    return NextResponse.json({ success: false, message: "Could not update payment request." }, { status: 500 });
  }
}
