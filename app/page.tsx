import { Hero } from "@/components/Landing/Hero";
import { SectionHeading } from "@/components/UI/SectionHeading";
import { CompanionCard } from "@/components/Companion/CompanionCard";
import { COMPANIONS } from "@/config/companions";
import { PRICING } from "@/config/pricing";
import { Card } from "@/components/UI/Card";
import { SiteHeader } from "@/components/Layout/SiteHeader";
import { SiteFooter } from "@/components/Layout/SiteFooter";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <section id="companions" className="mx-auto max-w-6xl px-6 py-8">
        <SectionHeading eyebrow="Companions" title="Meet the launch companions" description="Ten unique personalities designed to feel emotionally present, warm, and consistent." />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {COMPANIONS.map((companion) => (
            <CompanionCard key={companion.id} companion={companion} />
          ))}
        </div>
      </section>
      <section id="features" className="mx-auto max-w-6xl px-6 py-8">
        <SectionHeading eyebrow="Features" title="Built for emotionally aware conversations" description="Warm responses, setup flow, memory-ready architecture, and a mobile-first interface." />
      </section>
      <section className="mx-auto max-w-6xl px-6 py-8">
        <SectionHeading eyebrow="Pricing" title="Simple plans" description="Start free, then move into premium chat and memory when you're ready." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PRICING.map((plan) => (
            <Card key={plan.plan}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">{plan.plan}</p>
              <h3 className="mt-3 text-2xl font-semibold">{plan.price}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
      <section id="faq" className="mx-auto max-w-6xl px-6 py-8">
        <SectionHeading eyebrow="FAQ" title="Common questions" description="A simple starting point for the MVP." />
      </section>
      <SiteFooter />
    </main>
  );
}
