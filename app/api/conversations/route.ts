import { NextResponse } from "next/server";
import { getCompanionById } from "@/config/companions";
import { getAuthContext } from "@/services/auth";
import { getConversationMemory, getConversationMessages, getOrCreateConversation, getRemainingFreeMessages } from "@/services/database";
import type { Language } from "@/types/chat";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const companionId = url.searchParams.get("companionId") ?? "";
  const language = (url.searchParams.get("language") ?? "English") as Language;
  const userName = url.searchParams.get("userName") ?? "Friend";
  const companion = getCompanionById(companionId);

  if (!companion) {
    return NextResponse.json({ success: false, message: "Companion not found." }, { status: 404 });
  }

  try {
    const auth = await getAuthContext(request, { companionId, language, displayName: userName });
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required to load saved conversations." }, { status: 401 });
    }

    const conversation = await getOrCreateConversation({ profile: auth.profile, companionId, language, userName });
    const [messages, memory] = await Promise.all([getConversationMessages(conversation.id), getConversationMemory(conversation.id)]);

    return NextResponse.json({
      success: true,
      data: {
        conversation,
        messages,
        memory,
        profile: auth.profile,
        remainingMessages: getRemainingFreeMessages(auth.profile)
      }
    });
  } catch (error) {
    console.error("Conversation load failed", error);
    return NextResponse.json({ success: false, message: "Could not load your conversation." }, { status: 500 });
  }
}
