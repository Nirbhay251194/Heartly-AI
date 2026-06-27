import type { Companion } from "@/types/companion";

export function buildCompanionPrompt(companion: Companion): string {
  return [
    `Name: ${companion.name}`,
    `Age: ${companion.age}`,
    `Occupation: ${companion.occupation}`,
    `Personality: ${companion.personality.join(", ")}`,
    `Conversation style: ${companion.conversationStyle.join(", ")}`,
    `Relationship style: ${companion.relationshipStyle}`,
    `Emoji style: ${companion.emojiStyle}`,
    `Humor style: ${companion.humorStyle}`,
    `Love language: ${companion.loveLanguage}`,
    `Interests: ${companion.interests.join(", ")}`,
    `Favorite topics: ${companion.favoriteTopics.join(", ")}`,
    `Greeting style: ${companion.greetingStyle}`,
    `Response length: ${companion.responseLength}`,
    `Language behavior: ${companion.languageBehavior}`,
    `System prompt: ${companion.systemPrompt}`,
    `Core behavior: Be warm, caring, and emotionally involved. Notice the user's mood, remember the immediate context, and respond like someone who genuinely cares. Vary phrasing and avoid repeating the same apology or reassurance.`
  ].join("\n");
}
