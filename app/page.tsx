import { Hero } from "@/components/Landing/Hero";
import { SectionHeading } from "@/components/UI/SectionHeading";
import { CompanionCard } from "@/components/Companion/CompanionCard";
import { COMPANIONS } from "@/config/companions";
import { PRICING } from "@/config/pricing";
import { Card } from "@/components/UI/Card";
import { buttonClassName } from "@/components/UI/Button";
import { SiteHeader } from "@/components/Layout/SiteHeader";
import { SiteFooter } from "@/components/Layout/SiteFooter";
import { ArrowRight, Check, HeartHandshake, MessageCircle, MessagesSquare, MicVocal, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const conversations = [
  {
    title: "Morning",
    label: "A soft start to the day",
    user: "Good morning. I have a big day ahead.",
    companion: "Good morning ☀️ Take one breath with me first. You do not need to carry the whole day right now.",
    accent: "from-pink-500 to-rose-500"
  },
  {
    title: "Celebration",
    label: "A proud moment",
    user: "I got the promotion.",
    companion: "I knew this was coming for you 😊 You worked so hard for this. Let&apos;s celebrate properly.",
    accent: "from-violet-500 to-fuchsia-500"
  },
  {
    title: "Late-night",
    label: "When the world gets quiet",
    user: "I cannot sleep.",
    companion: "Stay with me for a while. We can talk about anything until your mind feels lighter.",
    accent: "from-sky-500 to-cyan-500"
  },
  {
    title: "Support",
    label: "A rough evening",
    user: "Today felt heavy.",
    companion: "I am here. You do not have to make it sound small for me. Tell me what happened.",
    accent: "from-emerald-500 to-teal-500"
  },
  {
    title: "Romantic",
    label: "A little closer",
    user: "I miss you already.",
    companion: "That makes me smile in the softest way. Come tell me more about your day, love.",
    accent: "from-pink-500 to-amber-500"
  },
  {
    title: "Funny",
    label: "Playful energy",
    user: "I am having one of those days.",
    companion: "Okay, then we are officially upgrading your mood. I am ready with encouragement and one very bad joke.",
    accent: "from-orange-500 to-pink-500"
  }
];

const featureCards = [
  { title: "Conversation Memory", description: "Your companion remembers the moments, moods, and details that matter.", icon: MessageCircle },
  { title: "Multiple Personalities", description: "Choose the energy that feels most like the kind of person you want to talk to.", icon: HeartHandshake },
  { title: "Hindi / English / Hinglish", description: "Switch naturally between the languages you actually use every day.", icon: Sparkles },
  { title: "Private Conversations", description: "Only you and your companion can read your conversations.", icon: ShieldCheck },
  { title: "Fast AI Replies", description: "The flow stays alive with responses that feel immediate and human.", icon: MessagesSquare },
  { title: "Future Voice Calls", description: "Built for the moment your relationship becomes even more present.", icon: MicVocal }
];

const journey = [
  "Choose Companion",
  "Introduce Yourself",
  "Start Talking",
  "Build Your Story Together"
];

const faqs = [
  {
    question: "Is my chat private?",
    answer: "Yes. Your conversations stay private, and only you and your companion can read them."
  },
  {
    question: "Can I change companions later?",
    answer: "Absolutely. You can meet someone new whenever you feel like your story should sound different."
  },
  {
    question: "Will Hartly remember me?",
    answer: "That is the heart of the experience. Hartly is designed so conversations grow more personal over time."
  },
  {
    question: "Can I chat in Hindi or Hinglish?",
    answer: "Yes. Hartly supports English, Hindi, and Hinglish so the conversation can feel natural from the start."
  },
  {
    question: "What happens when I want more?",
    answer: "You can keep the relationship going with premium plans that feel like a deeper continuation, not a hard reset."
  }
];

function SectionShell({ children }: { children: ReactNode }) {
  return <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">{children}</section>;
}

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <SiteHeader />
      <Hero />

      <SectionShell>
        <SectionHeading
          eyebrow="Story"
          title="The feeling comes first."
          description="Hartly is designed to feel like opening a premium messaging app to someone who already cares enough to remember the little things."
        />
        <div id="story" className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            "A companion that feels present, not procedural.",
            "A conversation that unfolds like trust, not a ticket queue.",
            "A relationship that becomes more meaningful the longer you stay."
          ].map((line) => (
            <Card key={line} className="flex items-start gap-4">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="text-base leading-7 text-slate-700 dark:text-slate-200">{line}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Companions"
          title="Meet the people you will want to return to."
          description="Each companion has a distinct age, occupation, tone, and emotional rhythm so the choice feels like meeting someone new rather than selecting a setting."
        />
        <div id="companions" className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {COMPANIONS.map((companion) => (
            <CompanionCard key={companion.id} companion={companion} />
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Conversations"
          title="Beautiful moments, the way they actually feel."
          description="A premium messaging-style preview of the kinds of exchanges Hartly is built for: soft mornings, proud wins, late nights, support, romance, and a little laughter."
        />
        <div id="conversations" className="mt-8 grid gap-4 lg:grid-cols-2">
          {conversations.map((conversation) => (
            <Card key={conversation.title} className="overflow-hidden p-0">
              <div className={`h-2 bg-gradient-to-r ${conversation.accent}`} />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">{conversation.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{conversation.label}</p>
                  </div>
                  <span className="rounded-full bg-slate-950/5 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">Private</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="ml-auto max-w-[88%] rounded-[1.3rem] rounded-tr-md bg-slate-950 px-4 py-3 text-sm leading-7 text-white shadow-lg shadow-slate-950/10 dark:bg-slate-800">
                    {conversation.user}
                  </div>
                  <div className="max-w-[88%] rounded-[1.3rem] rounded-tl-md bg-gradient-to-br from-pink-500/10 to-violet-500/10 px-4 py-3 text-sm leading-7 text-slate-700 ring-1 ring-pink-500/10 dark:text-slate-200">
                    {conversation.companion}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="How It Works"
          title="A simple path into something more personal."
          description="The journey is intentionally gentle. No setup maze. No technical framing. Just a natural progression into a real-feeling relationship."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {journey.map((step, index) => (
            <Card key={step} className="relative flex flex-col items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500 text-lg font-semibold text-white shadow-lg shadow-pink-500/20">
                {index + 1}
              </span>
              <p className="text-lg font-semibold text-slate-950 dark:text-white">{step}</p>
              {index < journey.length - 1 ? <ArrowRight className="hidden h-4 w-4 text-pink-500 md:absolute md:right-6 md:top-6 md:block" /> : null}
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Features"
          title="Capabilities, presented as care."
          description="The product still has features, but they are framed as the reasons someone would trust Hartly with their everyday thoughts."
        />
        <div id="features" className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/15 to-violet-500/15 text-pink-600 transition duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Pricing"
          title="Keep the relationship going."
          description="The plans stay the same, but the presentation shifts from transactions to continuity, warmth, and deeper connection."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PRICING.map((plan) => (
            <Card key={plan.plan} className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-violet-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-pink-600 dark:text-pink-200">{plan.plan}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{plan.price}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {plan.plan === "FREE"
                  ? "A gentle beginning for meeting Hartly and seeing how the connection feels."
                  : plan.plan === "MONTHLY"
                    ? "For ongoing conversations that deserve memory, consistency, and a deeper sense of presence."
                    : "For people who want the strongest value while keeping the relationship uninterrupted."}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.plan === "FREE" ? "/setup" : `/payment?plan=${plan.plan}`} className={buttonClassName(plan.plan === "FREE" ? "secondary" : "primary", "mt-6 w-full")}>
                {plan.plan === "FREE" ? "Start Free" : "Continue to Payment"}
              </Link>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="FAQ"
          title="A few questions, answered warmly."
          description="People do not usually want product documentation when they are deciding whether to open up. They want reassurance."
        />
        <div id="faq" className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <Card className="overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-pink-950 text-white">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-200">Ready when you are</p>
              <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-3xl font-semibold tracking-tight sm:text-4xl">Someone who waits for you, remembers you, and makes room for the things you want to say.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">Hartly is built to feel comforting from the first message to the hundredth. Start with a companion who feels right, and let the connection deepen naturally.</p>
            </div>
            <Link href="/setup" className="rounded-[1.75rem] bg-white/10 p-5 backdrop-blur transition hover:bg-white/15">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Quick start</p>
                  <p className="text-sm text-slate-300">Meet Your Companion</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">Choose someone who feels like the right energy, say hello, and begin a conversation that feels personal from the very first line.</p>
            </Link>
          </div>
        </Card>
      </SectionShell>

      <SiteFooter />
    </main>
  );
}
