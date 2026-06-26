import { Button } from "@/components/UI/Button";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
      <div>
        <p className="mb-4 inline-flex rounded-full bg-pink-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-pink-600">
          Premium AI Companion
        </p>
        <h1 className="font-[family-name:var(--font-poppins)] text-5xl font-semibold leading-tight text-slate-950 dark:text-white md:text-6xl">
          Your AI Companion That Truly Listens.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">{APP_NAME} helps you build meaningful, emotionally intelligent conversations that feel warm and human.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>Start Chat</Button>
          <Button variant="secondary">Meet Companions</Button>
        </div>
        <p className="mt-4 text-sm text-slate-500">{APP_TAGLINE}</p>
      </div>
      <div className="rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-lg shadow-pink-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] bg-gradient-to-br from-pink-500 to-rose-500 p-5 text-white">
            <p className="text-sm opacity-90">Warm greetings</p>
            <p className="mt-2 text-xl font-semibold">Companions that feel present.</p>
          </div>
          <div className="rounded-[20px] bg-slate-950 p-5 text-white">
            <p className="text-sm text-slate-300">Memory ready</p>
            <p className="mt-2 text-xl font-semibold">Built for long-term conversations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
