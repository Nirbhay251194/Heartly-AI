"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LogIn, LogOut, MessageSquareText, Sparkles, UserRound } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button, buttonClassName } from "@/components/UI/Button";
import { Card } from "@/components/UI/Card";
import { ChatInput } from "@/components/Chat/ChatInput";
import { MessageBubble } from "@/components/Chat/MessageBubble";
import { TypingIndicator } from "@/components/Chat/TypingIndicator";
import { COMPANIONS, getCompanionById } from "@/config/companions";
import { getSupabaseClient } from "@/services/supabase";
import type { ChatMessage, Language } from "@/types/chat";

interface SetupState {
  name: string;
  language: Language;
  companionId: string;
}

interface ChatApiResponse {
  success: boolean;
  message?: string;
  data?: {
    reply?: string;
    userMessage?: ChatMessage;
    assistantMessage?: ChatMessage;
    messages?: ChatMessage[];
    remainingMessages?: number | null;
  };
}

const defaultSetup: SetupState = {
  name: "Friend",
  language: "English",
  companionId: COMPANIONS[0]?.id ?? ""
};

const ANONYMOUS_MESSAGE_LIMIT = 4;

function readSetup(): SetupState {
  const raw = localStorage.getItem("hartly.setup");
  if (!raw) return defaultSetup;

  try {
    return { ...defaultSetup, ...(JSON.parse(raw) as Partial<SetupState>) };
  } catch {
    localStorage.removeItem("hartly.setup");
    return defaultSetup;
  }
}

function getAnonymousId() {
  const existing = localStorage.getItem("hartly.anonymousId");
  if (existing) return existing;

  const id = crypto.randomUUID();
  localStorage.setItem("hartly.anonymousId", id);
  return id;
}

function anonymousMessageKey(setup: SetupState) {
  return `hartly.messages.${setup.companionId}.${setup.language}.${setup.name.trim() || "Friend"}`;
}

export default function ChatPage() {
  const [setup, setSetup] = useState<SetupState | null>(null);
  const [anonymousId, setAnonymousId] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [remainingMessages, setRemainingMessages] = useState<number | null>(4);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [showLimitModal, setShowLimitModal] = useState(false);
  const loadedKeyRef = useRef("");
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const supabase = useMemo(() => getSupabaseClient(), []);

  useEffect(() => {
    setSetup(readSetup());
    setAnonymousId(getAnonymousId());
  }, []);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const companion = useMemo(() => getCompanionById(setup?.companionId ?? defaultSetup.companionId), [setup]);
  const anonymousMessagesUsed = useMemo(() => messages.filter((message) => message.sender === "user").length, [messages]);
  const anonymousRemaining = Math.max(0, ANONYMOUS_MESSAGE_LIMIT - anonymousMessagesUsed);
  const effectiveRemainingMessages = session ? remainingMessages : anonymousRemaining;

  useEffect(() => {
    if (!setup || !companion || !anonymousId) return;

    const loadKey = `${session?.user.id ?? "anonymous"}:${setup.companionId}:${setup.language}:${setup.name}`;
    if (loadedKeyRef.current === loadKey) return;
    loadedKeyRef.current = loadKey;
    setIsLoading(true);
    setNotice("");

    async function loadConversation() {
      if (!setup || !companion) return;

      if (!session) {
        const saved = localStorage.getItem(anonymousMessageKey(setup));
        if (saved) {
          try {
            setMessages(JSON.parse(saved) as ChatMessage[]);
            setIsLoading(false);
            return;
          } catch {
            localStorage.removeItem(anonymousMessageKey(setup));
          }
        }

        const greeting = await requestGreeting(setup, companion.id, anonymousId);
        setMessages([greeting]);
        setRemainingMessages(anonymousRemaining);
        localStorage.setItem(anonymousMessageKey(setup), JSON.stringify([greeting]));
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/conversations?companionId=${encodeURIComponent(companion.id)}&language=${encodeURIComponent(setup.language)}&userName=${encodeURIComponent(setup.name)}`, {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });
      const data = (await response.json()) as ChatApiResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Could not load your conversation.");
      }

      const serverMessages = data.data?.messages ?? [];
      setMessages((current) => (current.length > 0 ? current : serverMessages));
      setRemainingMessages(data.data?.remainingMessages ?? null);
      setIsLoading(false);
    }

    loadConversation().catch((error) => {
      console.error(error);
      setNotice(error instanceof Error ? error.message : "Could not load your conversation.");
      setIsLoading(false);
    });
  }, [anonymousId, anonymousRemaining, companion, session, setup]);

  useEffect(() => {
    if (!setup || session || messages.length === 0) return;
    localStorage.setItem(anonymousMessageKey(setup), JSON.stringify(messages));
  }, [messages, session, setup]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, isLoading]);

  async function requestGreeting(currentSetup: SetupState, companionId: string, currentAnonymousId: string): Promise<ChatMessage> {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companionId,
        language: currentSetup.language,
        userName: currentSetup.name,
        anonymousId: currentAnonymousId,
        message: "__greeting__"
      })
    });
    const data = (await response.json()) as ChatApiResponse;
    return {
      id: crypto.randomUUID(),
      conversationId: "local",
      sender: "assistant",
      type: "TEXT",
      content: data.data?.reply ?? `Hi ${currentSetup.name || "there"} 😊 How has your day been?`,
      language: currentSetup.language,
      createdAt: new Date().toISOString()
    };
  }

  async function sendMessage(content: string) {
    if (!setup || !companion) return;
    if (!session && anonymousRemaining <= 0) {
      setShowLimitModal(true);
      return;
    }

    const recentMessages = messages.slice(-12);
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      conversationId: session ? "pending" : "local",
      sender: "user",
      type: "TEXT",
      content,
      language: setup.language,
      createdAt: new Date().toISOString()
    };

    setMessages((current) => [...current, userMessage]);
    setIsTyping(true);
    setNotice("");

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (session) headers.Authorization = `Bearer ${session.access_token}`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          companionId: companion.id,
          language: setup.language,
          userName: setup.name,
          anonymousId,
          message: content,
          recentMessages: recentMessages.map((message) => ({
            role: message.sender === "user" ? "user" : "assistant",
            content: message.content
          }))
        })
      });

      const data = (await response.json()) as ChatApiResponse;
      if (!response.ok || !data.success) {
        setMessages((current) => current.filter((message) => message.id !== userMessage.id));
        setNotice(data.message ?? "I could not send that message right now. Please try again.");
        setRemainingMessages(data.data?.remainingMessages ?? remainingMessages);
        return;
      }

      setRemainingMessages(data.data?.remainingMessages ?? remainingMessages);
      setMessages((current) => {
        const withoutPending = current.filter((message) => message.id !== userMessage.id);
        const savedUserMessage = data.data?.userMessage ?? userMessage;
        const assistantMessage =
          data.data?.assistantMessage ??
          ({
            id: crypto.randomUUID(),
            conversationId: "local",
            sender: "assistant",
            type: "TEXT",
            content: data.data?.reply ?? "I am here with you.",
            language: setup.language,
            createdAt: new Date().toISOString()
          } satisfies ChatMessage);

        return [...withoutPending, savedUserMessage, assistantMessage];
      });
    } catch (error) {
      console.error(error);
      setMessages((current) => current.filter((message) => message.id !== userMessage.id));
      setNotice("I could not send that message right now. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }

  async function logout() {
    await supabase?.auth.signOut();
    setSession(null);
  }

  if (!setup || !companion) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-600">
            <MessageSquareText className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">Loading chat...</h1>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">We are restoring your companion and conversation state.</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col gap-3 px-3 py-3 sm:px-4">
      <Card className="sticky top-3 z-30 flex flex-wrap items-center justify-between gap-4 border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-slate-800/90 dark:bg-slate-950/90">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 bg-cover bg-center shadow-lg shadow-pink-500/20" style={{ backgroundImage: `url(${companion.avatar})` }} />
          <div>
            <div className="font-semibold text-slate-950 dark:text-white">{companion.name}</div>
            <div className="text-xs text-emerald-500">{companion.onlineStatus} now</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/setup" className={buttonClassName("secondary", "h-10")}>
            <MessageSquareText className="mr-2 h-4 w-4" />
            Change Companion
          </Link>
          {session ? (
            <>
              <Link href="/profile" className={buttonClassName("ghost", "h-10")}>
                <UserRound className="mr-2 h-4 w-4" />
                Profile
              </Link>
              <Button type="button" variant="ghost" className="h-10" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login?redirectTo=/chat" className={buttonClassName("ghost", "h-10")}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          )}
        </div>
      </Card>
      <Card className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <div className="flex flex-wrap gap-2">
            <MetaPill label="Language" value={setup.language} />
            <MetaPill label="Mood" value={companion.greetingStyle} />
            <MetaPill label="Tone" value={companion.relationshipStyle} />
            <MetaPill label="Age" value={`${companion.age}`} />
          </div>
          <span>{effectiveRemainingMessages === null ? "Unlimited messages" : `${effectiveRemainingMessages} free messages left`}</span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {isLoading ? (
            <div className="space-y-3 py-10">
              <div className="h-20 rounded-[24px] bg-slate-100 dark:bg-slate-800/80" />
              <div className="ml-auto h-16 w-3/4 rounded-[24px] bg-pink-100 dark:bg-pink-950/40" />
              <div className="h-16 w-2/3 rounded-[24px] bg-slate-100 dark:bg-slate-800/80" />
            </div>
          ) : null}
          {!isLoading && messages.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">No messages yet. Say hello to begin.</p>
          ) : null}
          {!isLoading &&
            messages.map((message) => <MessageBubble key={message.id} message={message} />)}
          {isTyping ? <TypingIndicator /> : null}
          <div ref={scrollAnchorRef} />
        </div>
        {notice ? <p className="mx-4 rounded-2xl bg-pink-50 px-4 py-3 text-sm text-pink-700 dark:bg-pink-950/30 dark:text-pink-200">{notice}</p> : null}
        <div className="sticky bottom-3 border-t border-slate-200 bg-white/95 px-4 pt-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
          <ChatInput onSend={sendMessage} disabled={isTyping || isLoading} />
        </div>
      </Card>
      {showLimitModal ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-3 py-3 backdrop-blur-sm sm:items-center">
          <Card className="w-full max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Keep this conversation going</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">You’ve used your 4 free anonymous messages.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <Link href="/login?redirectTo=/chat" onClick={() => setShowLimitModal(false)} className={buttonClassName("primary", "w-full")}>
                Continue with Email
              </Link>
              {process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === "true" ? (
                <Link href="/login?redirectTo=/chat" onClick={() => setShowLimitModal(false)} className={buttonClassName("secondary", "w-full")}>
                  Continue with Google
                </Link>
              ) : null}
              <Link href="/payment" onClick={() => setShowLimitModal(false)} className={buttonClassName("ghost", "w-full")}>
                Subscribe Now
              </Link>
              <button type="button" onClick={() => setShowLimitModal(false)} className="text-sm font-medium text-slate-500">
                Not now
              </button>
            </div>
          </Card>
        </div>
      ) : null}
    </main>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/5 px-3 py-1.5 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
      <span className="uppercase tracking-[0.18em] text-slate-400">{label}</span>
      <span className="font-semibold text-slate-950 dark:text-white">{value}</span>
    </span>
  );
}
