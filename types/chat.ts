export type Language = "English" | "Hindi" | "Hinglish";

export type MessageSender = "user" | "assistant" | "system";
export type MessageType = "TEXT" | "VOICE" | "IMAGE" | "SYSTEM" | "SUMMARY" | "MEMORY";
export type RelationshipStage = "New" | "Friendly" | "Comfortable" | "Close" | "Trusted" | "Long-Term";

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: MessageSender;
  type: MessageType;
  content: string;
  language: Language;
  tokenCount?: number;
  createdAt: string;
}

export interface ConversationSummary {
  id: string;
  conversationId: string;
  summary: string;
  relationshipStage: RelationshipStage;
  lastUpdatedMessage?: string;
  createdAt: string;
  updatedAt: string;
}
