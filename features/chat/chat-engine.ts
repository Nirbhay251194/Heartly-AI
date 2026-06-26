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

  return [
    GLOBAL_SYSTEM_PROMPT,
    buildCompanionPrompt(input.companion),
    LANGUAGE_RULES[input.language],
    `Relationship stage: ${input.relationshipStage}`,
    input.memorySummary ? `Memory summary:\n${input.memorySummary}` : "",
    recentConversation ? `Recent conversation:\n${recentConversation}` : "",
    `USER: ${input.userMessage}`
  ]
    .filter(Boolean)
    .join("\n\n");
}
