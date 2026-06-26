import type { User } from "@supabase/supabase-js";
import { getSupabaseAdminClient } from "@/services/supabase";
import type { Language } from "@/types/chat";
import type { ProfileRecord } from "@/types/database";

export interface AuthContext {
  token: string;
  user: User;
  profile: ProfileRecord;
}

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  const token = header.slice("Bearer ".length).trim();
  return token || null;
}

function getDisplayName(user: User): string {
  const metadata = user.user_metadata as { full_name?: string; name?: string } | null;
  return metadata?.full_name ?? metadata?.name ?? user.email?.split("@")[0] ?? "Friend";
}

function getProvider(user: User): string {
  return user.app_metadata.provider ?? "email";
}

export async function upsertProfileForUser(user: User, input?: { language?: Language; companionId?: string; displayName?: string }): Promise<ProfileRecord> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const profile: Partial<ProfileRecord> & Pick<ProfileRecord, "id" | "email"> = {
    id: user.id,
    email: user.email ?? `${user.id}@hartly.local`,
    display_name: input?.displayName?.trim() || getDisplayName(user),
    avatar_url: typeof user.user_metadata.avatar_url === "string" ? user.user_metadata.avatar_url : null,
    auth_provider: getProvider(user),
    preferred_language: input?.language ?? "English",
    current_companion_id: input?.companionId ?? null
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile, { onConflict: "id" })
    .select("*")
    .single<ProfileRecord>();

  if (error || !data) {
    throw new Error("Could not create or load profile.");
  }

  return data;
}

export async function getAuthContext(request: Request, input?: { language?: Language; companionId?: string; displayName?: string }): Promise<AuthContext | null> {
  const token = getBearerToken(request);
  if (!token) {
    return null;
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return null;
  }

  const profile = await upsertProfileForUser(data.user, input);
  return { token, user: data.user, profile };
}
