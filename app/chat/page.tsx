"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import { ChatInput } from "@/components/Chat/ChatInput";
import { MessageBubble } from "@/components/Chat/MessageBubble";
import { TypingIndicator } from "@/components/Chat/TypingIndicator";
import { COMPANIONS, getCompanionById } from "@/config/companions";
import type { ChatMessage, Language } from "@/types/chat";

interface SetupState {
  name: string;
  language: Language;
  companionId: string;
}

export default function ChatPage() {
  const [setup, setSetup] = useState<SetupState | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("hartly.setup");
    if (!raw) {
      setSetup({ name: "Friend", language: "English", companionId: COMPANIONS[0]?.id ?? "" });
      return;
    }
    setSetup(JSON.parse(raw) as SetupState);
  }, []);

  const companion = useMemo(() => getCompanionById(setup?.companionId ?? COMPANIONS[0]?.id ?? ""), [setup]);

  useEffect(() => {
    if (!setup || !companion || messages.length > 0) return;
    const greeting = {
      id: crypto.randomUUID(),
      conversationId: "local",
      sender: "assistant" as const,
      type: "TEXT" as const,
      content: `${companion.name} is here. Let's talk in ${setup.language.toLowerCase()}.`,
      language: setup.language,
      createdAt: new Date().toISOString()
    };
    setMessages([greeting]);
  }, [setup, companion, messages.length]);

  async function sendMessage(content: string) {
    if (!setup || !companion) return;
    const recentMessages = messages.slice(-12);
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId: "local",
      sender: "user",
      type: "TEXT",
      content,
      language: setup.language,
      createdAt: new Date().toISOString()
    };

    setMessages((current) => [...current, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companionId: companion.id,
          language: setup.language,
          userName: setup.name,
          message: content,
          recentMessages: recentMessages.map((message) => ({
            role: message.sender === "user" ? "user" : "assistant",
            content: message.content
          }))
        })
      });

      const data: { success: boolean; data?: { reply?: string } } = await response.json();
      const reply = data.data?.reply ?? "I’m here with you.";
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          conversationId: "local",
          sender: "assistant",
          type: "TEXT",
          content: reply,
          language: setup.language,
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  if (!setup || !companion) {
    return <div className="flex min-h-screen items-center justify-center">Loading chat...</div>;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-4">
      <Card className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
          <div>
            <div className="font-semibold">{companion.name}</div>
            <div className="text-xs text-emerald-500">Online now</div>
          </div>
        </div>
        <Button variant="secondary">
          <MessageSquareText className="mr-2 h-4 w-4" />
          Change Companion
        </Button>
      </Card>
      <Card className="flex min-h-[65vh] flex-1 flex-col gap-4 overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-1">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping ? <TypingIndicator /> : null}
        </div>
        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </div>
      </Card>
    </main>
  );
}
