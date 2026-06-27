"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { SectionHeading } from "@/components/UI/SectionHeading";
import { CompanionPicker } from "@/components/Companion/CompanionPicker";
import { COMPANIONS } from "@/config/companions";
import { getSupabaseClient } from "@/services/supabase";
import type { Language } from "@/types/chat";

const languages: Language[] = ["English", "Hindi", "Hinglish"];

export default function SetupPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("English");
  const [companionId, setCompanionId] = useState(COMPANIONS[0]?.id ?? "");

  const canContinue = useMemo(() => Boolean(name.trim() && language && companionId), [name, language, companionId]);

  useEffect(() => {
    const saved = localStorage.getItem("hartly.setup");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<{ name: string; language: Language; companionId: string }>;
        if (parsed.name) setName(parsed.name);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.companionId) setCompanionId(parsed.companionId);
      } catch {
        localStorage.removeItem("hartly.setup");
      }
    }

    const selectedCompanion = new URLSearchParams(window.location.search).get("companionId");
    if (selectedCompanion && COMPANIONS.some((companion) => companion.id === selectedCompanion)) {
      setCompanionId(selectedCompanion);
    }
  }, []);

  async function handleContinue() {
    localStorage.setItem("hartly.setup", JSON.stringify({ name, language, companionId }));

    const sessionResult = await supabase?.auth.getSession();
    const session = sessionResult?.data.session ?? null;
    if (session) {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ displayName: name, language, companionId })
      });
    }

    router.push("/chat");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <SectionHeading eyebrow="Setup" title="Choose your companion" description="Pick a companion, your preferred language, and the name you'd like them to use." />
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
        <span>Have an account?</span>
        <Link href="/login?redirectTo=/chat" className="font-semibold text-pink-600">
          Log in to keep conversations across devices
        </Link>
      </div>
      <div className="mt-8 grid gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Your name</label>
          <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Language</label>
          <div className="flex flex-wrap gap-3">
            {languages.map((option) => (
              <button key={option} type="button" onClick={() => setLanguage(option)} className={`rounded-full border px-4 py-2 text-sm ${language === option ? "border-pink-500 bg-pink-500 text-white" : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"}`}>
                {option}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Companion</label>
          <CompanionPicker companions={COMPANIONS} value={companionId} onChange={setCompanionId} />
        </div>
        <Button onClick={handleContinue} disabled={!canContinue}>
          Continue
        </Button>
      </div>
    </main>
  );
}
