import type { Companion } from "@/types/companion";
import { Card } from "@/components/UI/Card";
import { Badge } from "@/components/UI/Badge";

export function CompanionCard({ companion }: { companion: Companion }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold">{companion.name}</h3>
            <Badge>{companion.age}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{companion.occupation}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {companion.personality.slice(0, 3).map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}
