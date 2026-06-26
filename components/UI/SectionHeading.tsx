interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-pink-500">{eyebrow}</p> : null}
      <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
  );
}
