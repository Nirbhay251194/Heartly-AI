export interface AuthResult {
  success: boolean;
  message: string;
}

export function getAuthAvailability(): AuthResult {
  const hasSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return hasSupabase
    ? { success: true, message: "Supabase auth configured." }
    : { success: false, message: "Supabase credentials are required for authentication flows." };
}
