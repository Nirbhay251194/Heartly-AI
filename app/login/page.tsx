"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { getSupabaseClient } from "@/services/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState("/chat");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useMemo(() => getSupabaseClient(), []);

  useEffect(() => {
    setRedirectTo(new URLSearchParams(window.location.search).get("redirectTo") || "/chat");
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace(redirectTo as Route);
    });
  }, [redirectTo, router, supabase]);

  async function continueWithGoogle() {
    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}${redirectTo}` }
    });

    if (error) setMessage(error.message);
  }

  async function continueWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}${redirectTo}` }
          });

    setIsLoading(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    const session = "session" in result.data ? result.data.session : null;
    if (mode === "signup" && !session) {
      setMessage("Check your email to confirm your account, then log in.");
      return;
    }

    router.replace(redirectTo as Route);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <Card className="w-full">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Continue your Hartly conversations across devices.</p>
        <div className="mt-6 grid gap-3">
          <Button type="button" onClick={continueWithGoogle}>
            Continue with Google
          </Button>
          <form onSubmit={continueWithEmail} className="grid gap-3">
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" minLength={6} required />
            <Button type="submit" variant="secondary" disabled={isLoading}>
              {isLoading ? "Please wait..." : mode === "login" ? "Continue with Email" : "Create Account"}
            </Button>
          </form>
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm font-medium text-pink-600">
            {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
          </button>
          {message ? <p className="rounded-2xl bg-pink-50 px-4 py-3 text-sm text-pink-700 dark:bg-pink-950/30 dark:text-pink-200">{message}</p> : null}
        </div>
      </Card>
    </main>
  );
}
