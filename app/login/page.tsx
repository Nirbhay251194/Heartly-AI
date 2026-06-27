"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { getSupabaseClient } from "@/services/supabase";

type AuthMode = "signin" | "signup";

interface ProfileResponse {
  success: boolean;
  data?: { isAdmin?: boolean };
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [mode, setMode] = useState<AuthMode>("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);

  useEffect(() => {
    setGoogleEnabled(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true");
  }, []);

  const routeAuthenticatedUser = useMemo(
    () => async (token: string) => {
      const response = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        router.replace("/chat");
        return;
      }

      const payload = (await response.json()) as ProfileResponse;
      router.replace(payload.data?.isAdmin ? "/dashboard" : "/chat");
    },
    [router]
  );

  useEffect(() => {
    if (!supabase) return;

    const routeForSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      await routeAuthenticatedUser(data.session.access_token);
    };

    routeForSession();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        routeAuthenticatedUser(session.access_token).catch(() => undefined);
      }
    });

    return () => data.subscription.unsubscribe();
  }, [routeAuthenticatedUser, supabase]);

  async function continueWithGoogle() {
    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    if (!googleEnabled) {
      setMessage("Google login is not configured for this environment.");
      return;
    }

    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}/login` }
    });

    if (error) setMessage(error.message);
  }

  async function submitEmailAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      let sessionToken = "";

      if (mode === "signin") {
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error || !result.data.session) {
          throw new Error(result.error?.message ?? "Sign in failed.");
        }
        sessionToken = result.data.session.access_token;
      } else {
        const signupResult = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/login`
          }
        });

        if (signupResult.error) {
          throw new Error(signupResult.error.message);
        }

        if (signupResult.data.session) {
          sessionToken = signupResult.data.session.access_token;
        } else {
          const autoSignIn = await supabase.auth.signInWithPassword({ email, password });
          if (autoSignIn.error || !autoSignIn.data.session) {
            throw new Error(autoSignIn.error?.message ?? "Account created. Please sign in again.");
          }
          sessionToken = autoSignIn.data.session.access_token;
        }
      }

      await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ displayName: mode === "signup" ? fullName : undefined })
      });

      await routeAuthenticatedUser(sessionToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8">
      <Card className="w-full">
        <div className="flex rounded-full bg-slate-950/[0.04] p-1 dark:bg-white/5">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setMessage("");
            }}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "signin" ? "bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setMessage("");
            }}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "signup" ? "bg-white text-slate-950 shadow-sm dark:bg-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Create Account
          </button>
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-slate-950 dark:text-white">{mode === "signin" ? "Welcome back" : "Create your Hartly account"}</h1>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {mode === "signin"
            ? "Sign in to continue your existing conversations."
            : "Create your account and continue the same companion conversation after signup."}
        </p>

        <div className="mt-6 grid gap-3">
          {googleEnabled ? (
            <Button type="button" onClick={continueWithGoogle} disabled={isLoading}>
              Continue with Google
            </Button>
          ) : (
            <Button type="button" disabled title="Google OAuth is not configured in this environment">
              Google unavailable
            </Button>
          )}

          <form onSubmit={submitEmailAuth} className="grid gap-3">
            {mode === "signup" ? (
              <Input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full name" required />
            ) : null}
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" minLength={6} required />
            {mode === "signup" ? (
              <Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" minLength={6} required />
            ) : null}
            <Button type="submit" variant="secondary" disabled={isLoading || (mode === "signup" && !fullName.trim())}>
              {isLoading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {message ? <p className="rounded-2xl bg-pink-50 px-4 py-3 text-sm text-pink-700 dark:bg-pink-950/30 dark:text-pink-200">{message}</p> : null}
        </div>
      </Card>
    </main>
  );
}
