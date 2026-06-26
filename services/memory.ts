import type { RelationshipStage } from "@/types/chat";

export interface MemorySummaryInput {
  transcript: string;
}

export function buildMemorySummary(transcript: string): string {
  const trimmed = transcript.trim();
  if (!trimmed) {
    return "";
  }

  return `Important facts and emotional context from the conversation so far:\n${trimmed.slice(0, 800)}`;
}

export function inferRelationshipStage(messageCount: number): RelationshipStage {
  if (messageCount < 3) return "New";
  if (messageCount < 7) return "Friendly";
  if (messageCount < 12) return "Comfortable";
  if (messageCount < 20) return "Close";
  return "Trusted";
}
