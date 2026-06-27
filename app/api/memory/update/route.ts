import { NextResponse } from "next/server";
import { getAuthContext } from "@/services/auth";
import { getRecentConversationMessages, refreshConversationMemory } from "@/services/database";
import type { ChatMessage } from "@/types/chat";

interface MemoryUpdateBody {
  conversationId?: string;
  messages?: ChatMessage[];
  previousSummary?: string;
}

export async function POST(request: Request) {
  let body: MemoryUpdateBody;

  try {
    body = (await request.json()) as MemoryUpdateBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  if (!body.conversationId) {
    return NextResponse.json({ success: false, message: "conversationId is required." }, { status: 400 });
  }

  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ success: false, message: "Login is required." }, { status: 401 });
    }

    const messages = body.messages?.length ? body.messages : await getRecentConversationMessages(body.conversationId);
    const memory = await refreshConversationMemory({
      conversationId: body.conversationId,
      messages,
      previousSummary: body.previousSummary
    });

    return NextResponse.json({ success: true, data: { memory } });
  } catch (error) {
    console.error("Memory update failed", error);
    return NextResponse.json({ success: false, message: "Could not update conversation memory." }, { status: 500 });
  }
}
