import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { APP_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-[family-name:var(--font-poppins)] text-lg font-semibold">
          {APP_NAME}
        </Link>
        <nav className="hidden gap-6 text-sm text-slate-600 md:flex dark:text-slate-300">
          <Link href="#features">Features</Link>
          <Link href="#companions">Companions</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="#faq">FAQ</Link>
        </nav>
        <Button>Start Chat</Button>
      </div>
    </header>
  );
}
