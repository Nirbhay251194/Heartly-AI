"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, MessageSquareText } from "lucide-react";
import { Card } from "@/components/UI/Card";
import { Button, buttonClassName } from "@/components/UI/Button";
import { getCompanionById } from "@/config/companions";
import { getSupabaseClient } from "@/services/supabase";
import type { ProfileRecord } from "@/types/database";

interface ProfileResponse {
  success: boolean;
  message?: string;
  data?: {
    profile: ProfileRecord;
    remainingMessages: number | null;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [remainingMessages, setRemainingMessages] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!supabase) {
      router.replace("/login?redirectTo=/profile");
      return;
    }

    async function loadProfile() {
      const client = supabase;
      if (!client) return;

      const { data } = await client.auth.getSession();
      if (!data.session) {
        router.replace("/login?redirectTo=/profile");
        return;
      }

      const response = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${data.session.access_token}` }
      });
      const payload = (await response.json()) as ProfileResponse;
      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.message ?? "Could not load profile.");
      }

      setProfile(payload.data.profile);
      setRemainingMessages(payload.data.remainingMessages);
    }

    loadProfile().catch((error) => setNotice(error instanceof Error ? error.message : "Could not load profile."));
  }, [router, supabase]);

  async function logout() {
    await supabase?.auth.signOut();
    router.replace("/");
  }

  if (!profile && !notice) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-xl">
          <p className="text-sm text-slate-500">Loading profile...</p>
        </Card>
      </main>
    );
  }

  const companion = profile?.current_companion_id ? getCompanionById(profile.current_companion_id) : null;
  const usageLabel =
    remainingMessages === null
      ? `${profile?.total_messages ?? 0} total messages, premium active`
      : `${profile?.daily_free_messages_used ?? 0}/10 used today, ${remainingMessages} left`;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-600">Account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Profile</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your account, companion, and usage summary.</p>
        </div>
        <Button type="button" variant="ghost" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {notice ? <p className="mt-6 rounded-[22px] bg-pink-50 px-4 py-3 text-sm text-pink-700 dark:bg-pink-950/30 dark:text-pink-200">{notice}</p> : null}

      {profile ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-pink-500 to-rose-500 text-2xl font-semibold text-white shadow-lg shadow-pink-500/20">
                {(profile.display_name ?? profile.email).slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-950 dark:text-white">{profile.display_name ?? "Friend"}</p>
                <p className="text-sm text-slate-500">{profile.email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ProfileItem label="Name" value={profile.display_name ?? "Friend"} />
              <ProfileItem label="Email" value={profile.email} />
              <ProfileItem label="Subscription" value={profile.subscription_status} />
              <ProfileItem label="Language" value={profile.preferred_language} />
              <ProfileItem label="Remaining messages" value={usageLabel} />
              <ProfileItem label="Selected companion" value={companion?.name ?? "Not selected"} />
            </div>
          </Card>

          <Card>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-600">Companion</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{companion?.name ?? "No companion selected"}</h2>
            {companion ? (
              <div className="mt-6 grid gap-4">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Age</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{companion.age}</p>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Personality</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {companion.personality.map((trait) => (
                      <span key={trait} className="rounded-full bg-slate-950/5 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Mood</p>
                  <p className="mt-2 font-medium text-slate-950 dark:text-white">{companion.greetingStyle}</p>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Conversation tone</p>
                  <p className="mt-2 font-medium text-slate-950 dark:text-white">{companion.relationshipStyle}</p>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Pick a companion in setup to continue the experience.</p>
            )}
          </Card>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/chat" className={buttonClassName("primary")}>
          <MessageSquareText className="mr-2 h-4 w-4" />
          Continue Chat
        </Link>
        <Link href="/setup" className={buttonClassName("secondary")}>
          Change Preferences
        </Link>
        <Link href="/pricing" className={buttonClassName("ghost")}>
          View Pricing
        </Link>
      </div>
    </main>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 break-words font-medium text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
