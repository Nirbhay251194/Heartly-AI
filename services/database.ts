import type { User } from "@supabase/supabase-js";
import { getCompanionById } from "@/config/companions";
import { buildGreeting } from "@/features/chat/greeting";
import { buildMemorySummary, inferRelationshipStage } from "@/services/memory";
import { getSupabaseAdminClient } from "@/services/supabase";
import type { ChatMessage, Language, RelationshipStage } from "@/types/chat";
import type { AdminSnapshot, ConversationMemoryRecord, ConversationRecord, MessageRecord, PaymentRequestRecord, ProfileRecord, SubscriptionRecordRow } from "@/types/database";
import type { SubscriptionPlan } from "@/types/subscription";

const RECENT_MESSAGE_LIMIT = 14;
const FREE_MESSAGE_LIMIT = 10;

export async function isDatabaseReady(): Promise<boolean> {
  return Boolean(getSupabaseAdminClient());
}

function getAdminClient() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Supabase credentials are required.");
  }
  return supabase;
}

export function mapMessageRecord(record: MessageRecord): ChatMessage {
  return {
    id: record.id,
    conversationId: record.conversation_id,
    sender: record.sender,
    type: "TEXT",
    content: record.message,
    language: record.language,
    tokenCount: record.token_count ?? undefined,
    createdAt: record.created_at
  };
}

export function isPremiumProfile(profile: Pick<ProfileRecord, "subscription_status" | "subscription_expiry">): boolean {
  if (profile.subscription_status === "FREE") {
    return false;
  }

  if (!profile.subscription_expiry) {
    return true;
  }

  return new Date(profile.subscription_expiry).getTime() > Date.now();
}

export function getRemainingFreeMessages(profile: Pick<ProfileRecord, "daily_free_messages_used" | "subscription_status" | "subscription_expiry">): number | null {
  if (isPremiumProfile(profile)) {
    return null;
  }

  return Math.max(0, FREE_MESSAGE_LIMIT - profile.daily_free_messages_used);
}

export async function updateProfilePreferences(profileId: string, input: { language?: Language; companionId?: string; displayName?: string }): Promise<ProfileRecord> {
  const supabase = getAdminClient();
  const payload: Partial<ProfileRecord> = {};

  if (input.language) payload.preferred_language = input.language;
  if (input.companionId) payload.current_companion_id = input.companionId;
  if (input.displayName?.trim()) payload.display_name = input.displayName.trim();

  const { data, error } = await supabase.from("profiles").update(payload).eq("id", profileId).select("*").single<ProfileRecord>();
  if (error || !data) {
    throw new Error("Could not update profile.");
  }

  return data;
}

export async function getOrCreateConversation(input: { profile: ProfileRecord; companionId: string; language: Language; userName: string }): Promise<ConversationRecord> {
  const supabase = getAdminClient();
  const companion = getCompanionById(input.companionId);
  if (!companion) {
    throw new Error("Companion not found.");
  }

  const { data: existing, error: existingError } = await supabase
    .from("conversations")
    .select("*")
    .eq("profile_id", input.profile.id)
    .eq("companion_id", input.companionId)
    .maybeSingle<ConversationRecord>();

  if (existingError) {
    throw new Error("Could not load conversation.");
  }

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      profile_id: input.profile.id,
      companion_id: input.companionId,
      title: `${companion.name} and ${input.userName || input.profile.display_name || "Friend"}`,
      status: "ACTIVE"
    })
    .select("*")
    .single<ConversationRecord>();

  if (error || !data) {
    throw new Error("Could not create conversation.");
  }

  const greeting = buildGreeting({
    companion,
    language: input.language,
    userName: input.userName || input.profile.display_name || "Friend",
    relationshipStage: "New"
  });
  await appendMessage({ conversationId: data.id, sender: "assistant", content: greeting, language: input.language });

  return data;
}

export async function getConversationMessages(conversationId: string): Promise<ChatMessage[]> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .returns<MessageRecord[]>();

  if (error) {
    throw new Error("Could not load messages.");
  }

  return (data ?? []).map(mapMessageRecord);
}

export async function getRecentConversationMessages(conversationId: string, limit = RECENT_MESSAGE_LIMIT): Promise<ChatMessage[]> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<MessageRecord[]>();

  if (error) {
    throw new Error("Could not load recent messages.");
  }

  return (data ?? []).reverse().map(mapMessageRecord);
}

export async function appendMessage(input: { conversationId: string; sender: "user" | "assistant" | "system"; content: string; language: Language; tokenCount?: number }): Promise<ChatMessage> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: input.conversationId,
      sender: input.sender,
      message: input.content,
      language: input.language,
      token_count: input.tokenCount ?? estimateTokenCount(input.content)
    })
    .select("*")
    .single<MessageRecord>();

  if (error || !data) {
    throw new Error("Could not save message.");
  }

  await supabase.from("conversations").update({ last_message_at: data.created_at }).eq("id", input.conversationId);
  return mapMessageRecord(data);
}

export async function incrementProfileMessageUsage(profile: ProfileRecord): Promise<ProfileRecord> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      daily_free_messages_used: profile.daily_free_messages_used + (isPremiumProfile(profile) ? 0 : 1),
      total_messages: profile.total_messages + 1
    })
    .eq("id", profile.id)
    .select("*")
    .single<ProfileRecord>();

  if (error || !data) {
    throw new Error("Could not update message usage.");
  }

  return data;
}

export async function getConversationMemory(conversationId: string): Promise<ConversationMemoryRecord | null> {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from("conversation_memory").select("*").eq("conversation_id", conversationId).maybeSingle<ConversationMemoryRecord>();
  if (error) {
    throw new Error("Could not load conversation memory.");
  }

  return data ?? null;
}

export async function refreshConversationMemory(input: { conversationId: string; messages: ChatMessage[]; previousSummary?: string }): Promise<ConversationMemoryRecord> {
  const supabase = getAdminClient();
  const userVisibleMessages = input.messages.filter((message) => message.sender !== "system");
  const transcript = userVisibleMessages
    .slice(-20)
    .map((message) => `${message.sender}: ${message.content}`)
    .join("\n");
  const summary = buildMemorySummary([input.previousSummary, transcript].filter(Boolean).join("\n\n"));
  const stage = inferRelationshipStage(userVisibleMessages.length);

  const { data, error } = await supabase
    .from("conversation_memory")
    .upsert(
      {
        conversation_id: input.conversationId,
        summary,
        relationship_stage: stage,
        last_updated_message: userVisibleMessages.at(-1)?.id ?? null
      },
      { onConflict: "conversation_id" }
    )
    .select("*")
    .single<ConversationMemoryRecord>();

  if (error || !data) {
    throw new Error("Could not update conversation memory.");
  }

  return data;
}

export async function createPaymentRequest(input: { profileId: string; plan: SubscriptionPlan; transactionId?: string; screenshotUrl?: string }): Promise<PaymentRequestRecord> {
  const supabase = getAdminClient();
  const amount = input.plan === "YEARLY" ? 1999 : input.plan === "MONTHLY" ? 199 : 0;
  const { data, error } = await supabase
    .from("payment_requests")
    .insert({
      profile_id: input.profileId,
      plan: input.plan,
      amount,
      upi_transaction_id: input.transactionId || null,
      payment_screenshot_url: input.screenshotUrl || null,
      payment_status: "PENDING"
    })
    .select("*")
    .single<PaymentRequestRecord>();

  if (error || !data) {
    throw new Error("Could not create payment request.");
  }

  return data;
}

export async function getProfileSubscriptions(profileId: string): Promise<SubscriptionRecordRow[]> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .returns<SubscriptionRecordRow[]>();

  if (error) {
    throw new Error("Could not load subscriptions.");
  }

  return data ?? [];
}

export async function getAdminSnapshot(): Promise<AdminSnapshot> {
  const supabase = getAdminClient();
  const [{ data: profiles, error: profilesError }, { data: conversations, error: conversationsError }, { data: paymentRequests, error: paymentsError }, { data: messages, error: messagesError }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(100).returns<ProfileRecord[]>(),
    supabase.from("conversations").select("*").order("updated_at", { ascending: false }).limit(100).returns<ConversationRecord[]>(),
    supabase.from("payment_requests").select("*, profiles(email, display_name)").order("created_at", { ascending: false }).limit(100).returns<PaymentRequestRecord[]>(),
    supabase.from("messages").select("token_count").returns<Array<{ token_count: number | null }>>()
  ]);

  if (profilesError || conversationsError || paymentsError || messagesError) {
    throw new Error("Could not load admin dashboard.");
  }

  return {
    profiles: profiles ?? [],
    conversations: conversations ?? [],
    paymentRequests: paymentRequests ?? [],
    tokenUsage: {
      totalMessages: messages?.length ?? 0,
      estimatedTokens: (messages ?? []).reduce((sum, message) => sum + (message.token_count ?? 0), 0)
    }
  };
}

export async function updatePaymentStatus(input: { paymentRequestId: string; status: "APPROVED" | "REJECTED"; admin: User; notes?: string }): Promise<PaymentRequestRecord> {
  const supabase = getAdminClient();
  const { data: payment, error: paymentError } = await supabase
    .from("payment_requests")
    .update({ payment_status: input.status, admin_notes: input.notes ?? null })
    .eq("id", input.paymentRequestId)
    .select("*")
    .single<PaymentRequestRecord>();

  if (paymentError || !payment) {
    throw new Error("Could not update payment request.");
  }

  if (input.status === "APPROVED" && payment.plan !== "FREE") {
    const now = new Date();
    const expiry = new Date(now);
    expiry.setDate(expiry.getDate() + (payment.plan === "YEARLY" ? 365 : 30));

    await supabase.from("profiles").update({ subscription_status: payment.plan, subscription_expiry: expiry.toISOString() }).eq("id", payment.profile_id);
    await supabase.from("subscriptions").insert({
      profile_id: payment.profile_id,
      plan: payment.plan,
      status: "ACTIVE",
      start_date: now.toISOString(),
      end_date: expiry.toISOString(),
      approved_by: input.admin.id
    });
  }

  return payment;
}

function estimateTokenCount(content: string): number {
  return Math.max(1, Math.ceil(content.trim().length / 4));
}

export function coerceRelationshipStage(value: string | null | undefined): RelationshipStage {
  if (value === "Friendly" || value === "Comfortable" || value === "Close" || value === "Trusted" || value === "Long-Term") {
    return value;
  }

  return "New";
}
