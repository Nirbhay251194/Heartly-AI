import type { CompanionGreetingInput } from "@/types/companion";

export function buildGreeting({ companion, language, userName, relationshipStage }: CompanionGreetingInput): string {
  const name = userName.trim() || "there";
  const stageSuffix = relationshipStage === "New" ? "" : " It's really nice to continue our conversation.";

  if (language === "Hindi") {
    return `नमस्ते ${name} 😊 मैं ${companion.name} हूँ।${stageSuffix} आज आपका दिन कैसा रहा?`;
  }

  if (language === "Hinglish") {
    return `Hey ${name} 😊 Main ${companion.name} hoon.${stageSuffix} Aaj ka din kaisa gaya?`;
  }

  return `Hi ${name} 😊 I'm ${companion.name}.${stageSuffix} How has your day been?`;
}
