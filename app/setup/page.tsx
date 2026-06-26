"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { SectionHeading } from "@/components/UI/SectionHeading";
import { CompanionPicker } from "@/components/Companion/CompanionPicker";
import { COMPANIONS } from "@/config/companions";
import type { Language } from "@/types/chat";

const languages: Language[] = ["English", "Hindi", "Hinglish"];

export default function SetupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("English");
  const [companionId, setCompanionId] = useState(COMPANIONS[0]?.id ?? "");

  const canContinue = useMemo(() => Boolean(name.trim() && language && companionId), [name, language, companionId]);

  function handleContinue() {
    localStorage.setItem("hartly.setup", JSON.stringify({ name, language, companionId }));
    router.push("/chat");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <SectionHeading eyebrow="Setup" title="Choose your companion" description="Pick a companion, your preferred language, and the name you'd like them to use." />
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
