/**
 * Utility helpers for exponential backoff reconnection strategies.
 * Exported so that multiple hooks (e.g., useWebSocket, usePresence) can share the same logic.
 */

/**
 * Compute the delay (in milliseconds) for a given reconnection attempt.
 * The delay grows exponentially but caps at a configurable maximum.
 */
export function backoffDelay(attempt: number, maxDelay = 30000): number {
  const delay = 1000 * 2 ** attempt; // 1s, 2s, 4s, 8s, ...
  return Math.min(delay, maxDelay);
}
