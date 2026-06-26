import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)] dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-[0_20px_60px_rgba(2,6,23,0.35)]", className)} {...props} />;
}
