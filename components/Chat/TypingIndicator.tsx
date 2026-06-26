export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
      <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-pink-500" />
      <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-pink-500 [animation-delay:120ms]" />
      <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-pink-500 [animation-delay:240ms]" />
    </div>
  );
}
