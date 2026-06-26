import { getSupabaseAdminClient } from "@/services/supabase";

export async function isDatabaseReady(): Promise<boolean> {
  return Boolean(getSupabaseAdminClient());
}
