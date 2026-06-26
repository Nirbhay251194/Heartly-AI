import type { Language, RelationshipStage } from "@/types/chat";
import type { Companion } from "@/types/companion";
import { buildChatPrompt } from "@/features/chat/chat-engine";
import { generateChatCompletion, type OpenRouterMessage } from "@/services/openrouter";
import { AI_MODELS } from "@/config/models";

export interface ChatContext {
  companion: Companion;
  language: Language;
  relationshipStage: RelationshipStage;
  memorySummary?: string;
  recentMessages: Array<{ role: "user" | "assistant"; content: string }>;
  userMessage: string;
}

function buildMessages(context: ChatContext): OpenRouterMessage[] {
  return [
    {
      role: "system",
      content: buildChatPrompt({
        companion: context.companion,
        language: context.language,
        relationshipStage: context.relationshipStage,
        memorySummary: context.memorySummary,
        recentMessages: context.recentMessages.map((message, index) => ({
          id: `${index}`,
          conversationId: "local",
          sender: message.role === "user" ? "user" : "assistant",
          type: "TEXT",
          content: message.content,
          language: context.language,
          createdAt: new Date().toISOString()
        })),
        userMessage: context.userMessage
      })
    }
  ];
}

export async function generateCompanionReply(context: ChatContext): Promise<string> {
  const messages = buildMessages(context);

  try {
    const primary = await generateChatCompletion(messages, AI_MODELS.primary);
    if (primary) {
      return primary;
    }
  } catch (error) {
    console.warn("Primary model failed", error);
  }

  return generateChatCompletion(messages, AI_MODELS.fallback);
}
