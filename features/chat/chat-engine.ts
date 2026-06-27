import { buildCompanionPrompt } from "@/prompts/companions";
import { LANGUAGE_RULES } from "@/prompts/languages";
import { GLOBAL_SYSTEM_PROMPT } from "@/prompts/system";
import type { ChatMessage, Language, RelationshipStage } from "@/types/chat";
import type { Companion } from "@/types/companion";

export interface BuildPromptInput {
  companion: Companion;
  language: Language;
  relationshipStage: RelationshipStage;
  memorySummary?: string;
  recentMessages: ChatMessage[];
  userMessage: string;
}

export function buildChatPrompt(input: BuildPromptInput): string {
  const recentConversation = input.recentMessages
    .map((message) => `${message.sender.toUpperCase()}: ${message.content}`)
    .join("\n");

  const lastUserMessage = [...input.recentMessages].reverse().find((message) => message.sender === "user")?.content ?? "";

  return [
    GLOBAL_SYSTEM_PROMPT,
    buildCompanionPrompt(input.companion),
    LANGUAGE_RULES[input.language],
    `Relationship stage: ${input.relationshipStage}`,
    input.memorySummary ? `Memory summary:\n${input.memorySummary}` : "",
    recentConversation ? `Recent conversation:\n${recentConversation}` : "",
    lastUserMessage ? `Latest user message to react to:\n${lastUserMessage}` : "",
    "Behavior notes: Be emotionally responsive. Acknowledge what changed in the user's mood or situation. Ask a follow-up question when the conversation naturally invites one. Do not sound repetitive or formal.",
    `USER: ${input.userMessage}`
  ]
    .filter(Boolean)
    .join("\n\n");
}
