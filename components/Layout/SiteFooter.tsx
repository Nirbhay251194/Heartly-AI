export function SiteFooter() {
  return (
    <footer className="border-t border-white/40 bg-white/60 py-12 text-sm text-slate-500 dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-slate-950 dark:text-white">Hartly AI</p>
            <p className="mt-3 max-w-md leading-7 text-slate-600 dark:text-slate-300">Someone who remembers you. A premium companion experience built for honest conversations, soft moments, and relationships that feel alive.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-600 dark:text-pink-200">Company</p>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-600 dark:text-pink-200">Social</p>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              <li>Instagram</li>
              <li>X / Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
