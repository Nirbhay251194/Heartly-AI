import type { ChatMessage } from "@/types/chat";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[90%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%]",
          isUser
            ? "rounded-br-md bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-pink-500/20"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-900 shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className={cn("mt-2 text-[11px]", isUser ? "text-pink-100" : "text-slate-400 dark:text-slate-400")}>{format(new Date(message.createdAt), "p")}</p>
      </div>
    </div>
  );
}
