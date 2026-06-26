import type { Language, MessageSender, RelationshipStage } from "@/types/chat";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types/subscription";

export type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ProfileRecord {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  auth_provider: string | null;
  preferred_language: Language;
  current_companion_id: string | null;
  subscription_status: SubscriptionPlan;
  subscription_expiry: string | null;
  daily_free_messages_used: number;
  total_messages: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationRecord {
  id: string;
  profile_id: string;
  companion_id: string;
  title: string;
  status: "ACTIVE" | "ARCHIVED";
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MessageRecord {
  id: string;
  conversation_id: string;
  sender: MessageSender;
  message: string;
  language: Language;
  token_count: number | null;
  created_at: string;
}

export interface ConversationMemoryRecord {
  id: string;
  conversation_id: string;
  summary: string;
  relationship_stage: RelationshipStage;
  last_updated_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionRecordRow {
  id: string;
  profile_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  start_date: string | null;
  end_date: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentRequestRecord {
  id: string;
  profile_id: string;
  amount: number;
  plan: SubscriptionPlan;
  upi_transaction_id: string | null;
  payment_screenshot_url: string | null;
  payment_status: PaymentStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Pick<ProfileRecord, "email" | "display_name"> | null;
}

export interface AdminSnapshot {
  profiles: ProfileRecord[];
  conversations: ConversationRecord[];
  paymentRequests: PaymentRequestRecord[];
  tokenUsage: {
    totalMessages: number;
    estimatedTokens: number;
  };
}
