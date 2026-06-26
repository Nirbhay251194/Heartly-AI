const ANONYMOUS_MESSAGE_LIMIT = 4;

const anonymousUsage = new Map<string, number>();

export function getAnonymousMessageStatus(anonymousId?: string): { allowed: boolean; remaining: number; used: number } {
  const id = anonymousId?.trim();
  if (!id) {
    return { allowed: false, remaining: 0, used: 0 };
  }

  const used = anonymousUsage.get(id) ?? 0;
  return {
    allowed: used < ANONYMOUS_MESSAGE_LIMIT,
    remaining: Math.max(0, ANONYMOUS_MESSAGE_LIMIT - used),
    used
  };
}

export function incrementAnonymousMessageUsage(anonymousId: string): { remaining: number; used: number } {
  const current = anonymousUsage.get(anonymousId) ?? 0;
  const used = current + 1;
  anonymousUsage.set(anonymousId, used);

  return {
    remaining: Math.max(0, ANONYMOUS_MESSAGE_LIMIT - used),
    used
  };
}
