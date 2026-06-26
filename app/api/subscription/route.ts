import { NextResponse } from "next/server";
import { getAuthContext } from "@/services/auth";
import { getProfileSubscriptions, getRemainingFreeMessages, isPremiumProfile } from "@/services/database";

export async function GET(request: Request) {
  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required." }, { status: 401 });
    }

    const subscriptions = await getProfileSubscriptions(auth.profile.id);
    return NextResponse.json({
      success: true,
      data: {
        profile: auth.profile,
        subscriptions,
        isPremium: isPremiumProfile(auth.profile),
        remainingMessages: getRemainingFreeMessages(auth.profile)
      }
    });
  } catch (error) {
    console.error("Subscription lookup failed", error);
    return NextResponse.json({ success: false, message: "Could not load subscription status." }, { status: 500 });
  }
}
