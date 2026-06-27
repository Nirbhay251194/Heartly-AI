import { NextResponse } from "next/server";
import { upsertProfileForUser } from "@/services/auth";
import { getSupabaseClient } from "@/services/supabase";

interface LoginBody {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  if (!body.email || !body.password) {
    return NextResponse.json({ success: false, message: "Email and password are required." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ success: false, message: "Supabase is not configured." }, { status: 500 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password
  });

  if (error || !data.session || !data.user) {
    return NextResponse.json({ success: false, message: error?.message ?? "Login failed." }, { status: 401 });
  }

  const profile = await upsertProfileForUser(data.user);
  return NextResponse.json({ success: true, data: { session: data.session, user: data.user, profile } });
}
