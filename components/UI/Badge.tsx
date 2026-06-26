import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-300", className)} {...props} />;
}
