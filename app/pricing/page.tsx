import Link from "next/link";
import { Card } from "@/components/UI/Card";
import { buttonClassName } from "@/components/UI/Button";
import { PRICING } from "@/config/pricing";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-semibold">Pricing</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Start free, then move to unlimited conversations when you are ready to keep Hartly close.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {PRICING.map((item) => (
          <Card key={item.plan}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">{item.plan}</p>
            <h2 className="mt-3 text-3xl font-semibold">{item.price}</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {item.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href={item.plan === "FREE" ? "/setup" : `/payment?plan=${item.plan}`} className={buttonClassName(item.plan === "FREE" ? "secondary" : "primary", "mt-6 w-full")}>
              {item.plan === "FREE" ? "Start Free" : "Continue to Payment"}
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
