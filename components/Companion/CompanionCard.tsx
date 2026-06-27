import type { Companion } from "@/types/companion";
import { Card } from "@/components/UI/Card";
import { Badge } from "@/components/UI/Badge";
import { Mail, MessageCircleHeart, Star, UserRound } from "lucide-react";
import Link from "next/link";

export function CompanionCard({ companion }: { companion: Companion }) {
  const portraitPlaceholder =
    companion.gender === "Female"
      ? "linear-gradient(160deg, #f9a8d4 0%, #fb7185 48%, #8b5cf6 100%)"
      : "linear-gradient(160deg, #38bdf8 0%, #6366f1 50%, #ec4899 100%)";

  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(15,23,42,0.06))]" />
        <div className="relative grid gap-5 p-5">
          <div className="flex items-start gap-4">
            <div
              className="relative h-28 w-24 shrink-0 overflow-hidden rounded-[1.75rem] bg-cover bg-center shadow-lg shadow-pink-500/20 transition duration-500 group-hover:scale-[1.03] group-hover:rotate-[-1deg]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0) 45%, rgba(15, 23, 42, 0.48) 100%), url(${companion.avatar}), ${portraitPlaceholder}`
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.7),transparent_22%),radial-gradient(circle_at_70%_72%,rgba(255,255,255,0.2),transparent_24%)] mix-blend-soft-light" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/20 to-transparent" />
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-slate-950/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {companion.onlineStatus}
              </div>
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/20 p-2 text-white backdrop-blur-sm">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/80">Portrait</p>
                <p className="mt-1 text-sm font-semibold leading-tight">{companion.name}</p>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{companion.name}</h3>
                <Badge className="bg-slate-950/5 text-slate-700 dark:bg-white/10 dark:text-white">{companion.age}</Badge>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{companion.occupation}</p>
              <p className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {companion.onlineStatus}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {companion.personality.slice(0, 4).map((item) => (
              <span key={item} className="rounded-full bg-slate-950/5 px-3 py-1 text-xs font-medium text-slate-600 transition group-hover:bg-pink-500/10 group-hover:text-pink-700 dark:bg-white/8 dark:text-slate-300 dark:group-hover:text-pink-200">
                {item}
              </span>
            ))}
          </div>
          <div className="grid gap-3 rounded-[1.5rem] bg-slate-950/[0.03] p-4 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-pink-500" />
              <span>{companion.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 h-4 w-4 text-amber-500" />
              <span className="italic text-slate-700 dark:text-slate-200">&quot;{companion.favoriteQuote}&quot;</span>
            </div>
            <div className="flex items-start gap-3">
              <UserRound className="mt-0.5 h-4 w-4 text-violet-500" />
              <span>{companion.shortBio}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={`/setup?companionId=${companion.id}`} className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-pink-500/30">
              Meet Companion
            </Link>
            <Link href={`/setup?companionId=${companion.id}`} className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition duration-300 hover:border-pink-200 hover:bg-pink-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
              <MessageCircleHeart className="mr-2 h-4 w-4 text-pink-500" />
              Preview chat
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
