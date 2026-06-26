import { buildMemorySummary, inferRelationshipStage } from "@/services/memory";

export function buildConversationSummary(transcript: string): string {
  return buildMemorySummary(transcript);
}

export function getRelationshipStageFromCount(messageCount: number) {
  return inferRelationshipStage(messageCount);
}
