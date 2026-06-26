interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="mb-3 inline-flex rounded-full bg-pink-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-700 dark:text-pink-200">{eyebrow}</p> : null}
      <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
  );
}
