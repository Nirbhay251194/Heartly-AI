import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full bg-pink-500/12 px-3 py-1 text-xs font-semibold tracking-wide text-pink-700 shadow-sm shadow-pink-500/5 ring-1 ring-inset ring-pink-500/10 dark:text-pink-200", className)} {...props} />;
}
