import type { ChatMessage } from "@/types/chat";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[85%] rounded-[22px] px-4 py-3 text-sm leading-6 shadow-sm", isUser ? "bg-pink-500 text-white" : "bg-slate-800 text-white")}>
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className={cn("mt-2 text-[11px]", isUser ? "text-pink-100" : "text-slate-300")}>{format(new Date(message.createdAt), "p")}</p>
      </div>
    </div>
  );
}
