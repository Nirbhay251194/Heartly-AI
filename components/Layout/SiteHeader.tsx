import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { APP_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/65 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/65">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-[family-name:var(--font-poppins)] text-lg font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-sm font-bold text-white shadow-lg shadow-pink-500/25">
            H
          </span>
          {APP_NAME}
        </Link>
        <nav className="hidden gap-6 text-sm text-slate-600 md:flex dark:text-slate-300">
          <Link href="#story">Story</Link>
          <Link href="#companions">Companions</Link>
          <Link href="#conversations">Conversations</Link>
          <Link href="#features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="#faq">FAQ</Link>
        </nav>
        <Button className="shadow-xl shadow-pink-500/20">Meet Your Companion</Button>
      </div>
    </header>
  );
}
