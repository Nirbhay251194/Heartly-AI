import type { Language } from "@/types/chat";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  authProvider?: string;
  preferredLanguage: Language;
  currentCompanionId?: string;
  subscriptionStatus: "FREE" | "MONTHLY" | "YEARLY";
  subscriptionExpiry?: string;
  dailyFreeMessagesUsed: number;
  totalMessages: number;
}
