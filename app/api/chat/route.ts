import { NextResponse } from "next/server";
import { getCompanionById } from "@/config/companions";
import { generateCompanionReply } from "@/services/chat";
import { buildGreeting } from "@/features/chat/greeting";
import type { Language } from "@/types/chat";

interface ChatRequestBody {
  companionId?: string;
  language?: Language;
  userName?: string;
  message?: string;
  recentMessages?: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const shouldStream = searchParams.get("stream") === "true";
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const companion = body.companionId ? getCompanionById(body.companionId) : undefined;
  if (!companion) {
    return NextResponse.json({ success: false, message: "Companion not found." }, { status: 404 });
  }

  if (!body.message || !body.language || !body.userName) {
    return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
  }

  try {
    if (body.message === "__greeting__") {
      const reply = buildGreeting({
        companion,
        language: body.language,
        userName: body.userName,
        relationshipStage: "New"
      });

      if (shouldStream) {
        return new Response(`data: ${JSON.stringify({ success: true, data: { reply } })}\n\n`, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive"
          }
        });
      }

      return NextResponse.json({ success: true, data: { reply } });
    }

    const reply = await generateCompanionReply({
      companion,
      language: body.language,
      relationshipStage: "New",
      memorySummary: "",
      recentMessages: body.recentMessages ?? [],
      userMessage: body.message
    });

    if (shouldStream) {
      return new Response(`data: ${JSON.stringify({ success: true, data: { reply } })}\n\n`, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive"
        }
      });
    }

    return NextResponse.json({ success: true, data: { reply } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate response.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
