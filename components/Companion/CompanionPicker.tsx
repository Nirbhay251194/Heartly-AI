import type { Companion } from "@/types/companion";
import { cn } from "@/utils/cn";

interface CompanionPickerProps {
  companions: Companion[];
  value?: string;
  onChange: (value: string) => void;
}

export function CompanionPicker({ companions, value, onChange }: CompanionPickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {companions.map((companion) => (
        <button
          key={companion.id}
          type="button"
          onClick={() => onChange(companion.id)}
          className={cn(
            "rounded-[20px] border p-4 text-left transition",
            value === companion.id ? "border-pink-500 bg-pink-500/5 shadow-sm" : "border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/80"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
            <div>
              <div className="font-semibold">{companion.name}</div>
              <div className="text-xs text-slate-500">{companion.occupation}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
