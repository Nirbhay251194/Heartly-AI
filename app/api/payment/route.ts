import { NextResponse } from "next/server";
import { getAuthContext } from "@/services/auth";
import { createPaymentRequest } from "@/services/database";
import type { SubscriptionPlan } from "@/types/subscription";

interface PaymentBody {
  plan?: SubscriptionPlan;
  transactionId?: string;
  screenshotUrl?: string;
  utrNumber?: string;
}

export async function POST(request: Request) {
  let body: PaymentBody;

  try {
    body = (await request.json()) as PaymentBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  if (body.plan !== "MONTHLY" && body.plan !== "YEARLY") {
    return NextResponse.json({ success: false, message: "Choose a paid plan." }, { status: 400 });
  }

  const transactionId = body.transactionId?.trim() || body.utrNumber?.trim() || "";
  const screenshotUrl = body.screenshotUrl?.trim() || "";
  if (!transactionId && !screenshotUrl) {
    return NextResponse.json({ success: false, message: "Add at least a UTR number or screenshot." }, { status: 400 });
  }

  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required." }, { status: 401 });
    }

    const paymentRequest = await createPaymentRequest({
      profileId: auth.profile.id,
      plan: body.plan,
      transactionId,
      screenshotUrl
    });

    return NextResponse.json({ success: true, data: { paymentRequest } });
  } catch (error) {
    console.error("Payment request failed", error);
    return NextResponse.json({ success: false, message: "Could not submit payment request." }, { status: 500 });
  }
}
