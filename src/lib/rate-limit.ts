import {
  LEAD_RATE_LIMIT_REQUESTS,
  LEAD_RATE_LIMIT_WINDOW_MS,
} from "@/lib/constants";

type RateLimitEntry = {
  requestCount: number;
  windowStartedAt: number;
};

const requestEntries = new Map<string, RateLimitEntry>();

/** Limits requests per key; replace this process-local map with Redis in production. */
export function isRateLimited(
  key: string,
  now: number = Date.now(),
): boolean {
  const entry = requestEntries.get(key);
  if (!entry || now - entry.windowStartedAt >= LEAD_RATE_LIMIT_WINDOW_MS) {
    requestEntries.set(key, { requestCount: 1, windowStartedAt: now });
    return false;
  }
  if (entry.requestCount >= LEAD_RATE_LIMIT_REQUESTS) return true;
  entry.requestCount += 1;
  return false;
}
