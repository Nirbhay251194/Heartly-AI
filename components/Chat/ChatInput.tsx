"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;
    setValue("");
    await onSend(message);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Type a message..." disabled={disabled} />
      <Button type="submit" disabled={disabled || !value.trim()} aria-label="Send message">
        Send
      </Button>
    </form>
  );
}
