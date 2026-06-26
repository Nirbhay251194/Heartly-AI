import type { Language, RelationshipStage } from "@/types/chat";

export interface Companion {
  id: string;
  name: string;
  gender: "Female" | "Male";
  age: number;
  avatar: string;
  occupation: string;
  city?: string;
  personality: string[];
  conversationStyle: string[];
  relationshipStyle: string;
  emojiStyle: string;
  humorStyle: string;
  loveLanguage: string;
  interests: string[];
  favoriteTopics: string[];
  greetingStyle: string;
  responseLength: "Short" | "Balanced" | "Thoughtful";
  languageBehavior: string;
  systemPrompt: string;
  status: "Active" | "Inactive";
  displayOrder: number;
  supportedLanguages: Language[];
}

export interface CompanionGreetingInput {
  companion: Companion;
  language: Language;
  userName: string;
  relationshipStage: RelationshipStage;
}
