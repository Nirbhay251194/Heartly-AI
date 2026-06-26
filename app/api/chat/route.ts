import { NextResponse } from "next/server";
import { getCompanionById } from "@/config/companions";
import { buildGreeting } from "@/features/chat/greeting";
import { getAuthContext } from "@/services/auth";
import { appendMessage, coerceRelationshipStage, getConversationMemory, getOrCreateConversation, getRecentConversationMessages, getRemainingFreeMessages, incrementProfileMessageUsage, refreshConversationMemory } from "@/services/database";
import { getAnonymousMessageStatus, incrementAnonymousMessageUsage } from "@/services/limits";
import { generateCompanionReplyResult } from "@/services/chat";
import type { Language } from "@/types/chat";

interface ChatRequestBody {
  companionId?: string;
  language?: Language;
  userName?: string;
  message?: string;
  anonymousId?: string;
  recentMessages?: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function POST(request: Request) {
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

  if (!body.message?.trim() || !body.language || !body.userName?.trim()) {
    return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
  }

  try {
    const auth = await getAuthContext(request, {
      companionId: companion.id,
      language: body.language,
      displayName: body.userName
    });

    if (!auth) {
      return handleAnonymousChat(body, companion);
    }

    const remaining = getRemainingFreeMessages(auth.profile);
    if (remaining !== null && remaining <= 0 && body.message !== "__greeting__") {
      return NextResponse.json(
        {
          success: false,
          message: "Your free messages are used. Premium keeps the conversation going.",
          data: { limitReached: true, remainingMessages: 0 }
        },
        { status: 402 }
      );
    }

    const conversation = await getOrCreateConversation({
      profile: auth.profile,
      companionId: companion.id,
      language: body.language,
      userName: body.userName
    });

    if (body.message === "__greeting__") {
      const recent = await getRecentConversationMessages(conversation.id, 1);
      return NextResponse.json({ success: true, data: { reply: recent.at(-1)?.content ?? buildGreeting({ companion, language: body.language, userName: body.userName, relationshipStage: "New" }) } });
    }

    const [memory, recentMessages] = await Promise.all([getConversationMemory(conversation.id), getRecentConversationMessages(conversation.id)]);
    const userMessage = await appendMessage({
      conversationId: conversation.id,
      sender: "user",
      content: body.message.trim(),
      language: body.language
    });

    const result = await generateCompanionReplyResult({
      companion,
      language: body.language,
      relationshipStage: coerceRelationshipStage(memory?.relationship_stage),
      memorySummary: memory?.summary,
      recentMessages: recentMessages.map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.content
      })),
      userMessage: body.message.trim()
    });

    const assistantMessage = await appendMessage({
      conversationId: conversation.id,
      sender: "assistant",
      content: result.reply,
      language: body.language,
      tokenCount: result.estimatedTokens
    });
    const updatedProfile = await incrementProfileMessageUsage(auth.profile);
    const allRecentMessages = [...recentMessages, userMessage, assistantMessage];
    await refreshConversationMemory({ conversationId: conversation.id, messages: allRecentMessages, previousSummary: memory?.summary });

    return NextResponse.json({
      success: true,
      data: {
        reply: result.reply,
        userMessage,
        assistantMessage,
        conversationId: conversation.id,
        model: result.model,
        usedFallback: result.usedFallback,
        remainingMessages: getRemainingFreeMessages(updatedProfile)
      }
    });
  } catch (error) {
    console.error("Chat route failed", error);
    return NextResponse.json({ success: false, message: "I could not send that message right now. Please try again." }, { status: 500 });
  }
}

async function handleAnonymousChat(body: ChatRequestBody, companion: NonNullable<ReturnType<typeof getCompanionById>>) {
  if (!body.anonymousId) {
    return NextResponse.json({ success: false, message: "Anonymous session is missing." }, { status: 400 });
  }

  if (body.message === "__greeting__") {
    return NextResponse.json({
      success: true,
      data: {
        reply: buildGreeting({
          companion,
          language: body.language ?? "English",
          userName: body.userName ?? "Friend",
          relationshipStage: "New"
        })
      }
    });
  }

  const status = getAnonymousMessageStatus(body.anonymousId);
  if (!status.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: "You have used your anonymous messages. Log in to continue with this companion.",
        data: { limitReached: true, remainingMessages: 0 }
      },
      { status: 402 }
    );
  }

  const result = await generateCompanionReplyResult({
    companion,
    language: body.language ?? "English",
    relationshipStage: "New",
    memorySummary: "",
    recentMessages: body.recentMessages ?? [],
    userMessage: body.message?.trim() ?? ""
  });
  const usage = incrementAnonymousMessageUsage(body.anonymousId);

  return NextResponse.json({
    success: true,
    data: {
      reply: result.reply,
      model: result.model,
      usedFallback: result.usedFallback,
      remainingMessages: usage.remaining
    }
  });
}
