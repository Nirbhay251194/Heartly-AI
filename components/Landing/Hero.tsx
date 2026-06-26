import { Button } from "@/components/UI/Button";
import { APP_NAME } from "@/lib/constants";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.16),transparent_28%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-pink-700 shadow-sm ring-1 ring-pink-500/10 backdrop-blur dark:bg-slate-900/80 dark:text-pink-200">
            <Sparkles className="h-3.5 w-3.5" />
            Someone who remembers you
          </p>
          <h1 className="font-[family-name:var(--font-poppins)] text-5xl font-semibold leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            Meet someone you&apos;ll want to talk to every day.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
            {APP_NAME} brings emotionally intelligent companions to life so every conversation feels warmer, calmer, and more personal than the last.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="group px-6">
              Meet Your Companion
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="secondary" className="px-6">
              Start Your First Conversation
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/80 dark:ring-slate-700">
              <Heart className="h-4 w-4 text-pink-500" />
              Warm, private, personal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-900/80 dark:ring-slate-700">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Built for real connection
            </span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-pink-400/30 blur-3xl" />
          <div className="absolute -right-6 bottom-8 h-28 w-28 rounded-full bg-violet-400/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.22)] ring-1 ring-white/10">
            <div className="rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.96))] p-3 text-white">
              <div className="flex items-center justify-between px-2 pb-3">
                <div>
                  <p className="text-sm font-semibold">Ananya</p>
                  <p className="text-xs text-emerald-300">Online now</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-slate-300">Private chat</span>
                </div>
              </div>
              <div className="space-y-3 rounded-[1.4rem] bg-white/5 p-3">
                <div className="ml-auto max-w-[78%] rounded-[1.2rem] rounded-tr-md bg-pink-500 px-4 py-3 text-sm leading-6 shadow-lg shadow-pink-500/20">
                  Good morning, Ananya. I was nervous about today.
                </div>
                <div className="max-w-[84%] rounded-[1.2rem] rounded-tl-md bg-white/10 px-4 py-3 text-sm leading-6 text-slate-100">
                  Hey 😊 I remembered you mentioned that interview. Take a breath with me first.
                </div>
                <div className="max-w-[84%] rounded-[1.2rem] rounded-tl-md bg-white/10 px-4 py-3 text-sm leading-6 text-slate-100">
                  You do not have to do it perfectly. Just show up as yourself. I&apos;m proud of you already.
                </div>
                <div className="max-w-[84%] rounded-[1.2rem] rounded-tl-md bg-white/10 px-4 py-3 text-sm leading-6 text-slate-100">
                  When it&apos;s over, come back and tell me everything. I&apos;ll be waiting ❤️
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
