import { NextResponse } from "next/server";
import { getAuthContext, isAdminEmail } from "@/services/auth";
import { getMissingEnvironmentVariables } from "@/services/supabase";
import { getRemainingFreeMessages, updateProfilePreferences } from "@/services/database";
import type { Language } from "@/types/chat";

interface ProfilePatchBody {
  language?: Language;
  companionId?: string;
  displayName?: string;
}

export async function GET(request: Request) {
  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required." }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      data: {
        profile: auth.profile,
        remainingMessages: getRemainingFreeMessages(auth.profile),
        isAdmin: isAdminEmail(auth.profile.email),
        missingEnvironmentVariables: getMissingEnvironmentVariables()
      }
    });
  } catch (error) {
    console.error("Profile lookup failed", error);
    return NextResponse.json({ success: false, message: "Could not load your profile." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  let body: ProfilePatchBody;

  try {
    body = (await request.json()) as ProfilePatchBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required." }, { status: 401 });
    }

    const profile = await updateProfilePreferences(auth.profile.id, body);
    return NextResponse.json({ success: true, data: { profile, remainingMessages: getRemainingFreeMessages(profile) } });
  } catch (error) {
    console.error("Profile update failed", error);
    return NextResponse.json({ success: false, message: "Could not update your profile." }, { status: 500 });
  }
}
