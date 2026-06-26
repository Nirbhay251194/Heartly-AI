import { Card } from "@/components/UI/Card";
import { PRICING } from "@/config/pricing";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-semibold">Pricing</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {PRICING.map((item) => (
          <Card key={item.plan}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">{item.plan}</p>
            <h2 className="mt-3 text-3xl font-semibold">{item.price}</h2>
          </Card>
        ))}
      </div>
    </main>
  );
}
