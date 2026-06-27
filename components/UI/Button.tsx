import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/20",
  secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  danger: "bg-red-500 text-white hover:bg-red-600"
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn("inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition", variantClasses[variant], className)} {...props} />;
}

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn("inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition", variantClasses[variant], className);
}
