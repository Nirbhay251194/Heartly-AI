import type { Language, RelationshipStage } from "@/types/chat";
import type { Companion } from "@/types/companion";
import { buildChatPrompt } from "@/features/chat/chat-engine";
import { generateChatCompletion, type ChatCompletionResult, type OpenRouterMessage } from "@/services/openrouter";
import { AI_MODELS } from "@/config/models";

export interface ChatContext {
  companion: Companion;
  language: Language;
  relationshipStage: RelationshipStage;
  memorySummary?: string;
  recentMessages: Array<{ role: "user" | "assistant"; content: string }>;
  userMessage: string;
}

export interface CompanionReplyResult {
  reply: string;
  model: string;
  estimatedTokens: number;
  usedFallback: boolean;
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
  const result = await generateCompanionReplyResult(context);
  return result.reply;
}

export async function generateCompanionReplyResult(context: ChatContext): Promise<CompanionReplyResult> {
  const messages = buildMessages(context);

  const primaryAttempts = 2;
  for (let attempt = 0; attempt < primaryAttempts; attempt += 1) {
    try {
      const primary = await generateChatCompletion(messages, AI_MODELS.primary);
      if (primary.content) {
        return toReplyResult(primary, false);
      }
    } catch (error) {
      console.warn("Primary model failed", error);
    }
  }

  try {
    const fallback = await generateChatCompletion(messages, AI_MODELS.fallback);
    if (fallback.content) {
      return toReplyResult(fallback, true);
    }
  } catch (error) {
    console.warn("Fallback model failed", error);
  }

  throw new Error("I could not reach Hartly's AI right now. Please try again in a moment.");
}

function toReplyResult(result: ChatCompletionResult, usedFallback: boolean): CompanionReplyResult {
  return {
    reply: result.content,
    model: result.model,
    estimatedTokens: result.estimatedTokens,
    usedFallback
  };
}
