/**
 * Simple reconnection helper that schedules a reconnect using exponential back‑off.
 * Consumers can call `schedule()` after a failure to trigger the next attempt.
 */
export function useReconnection(
  reconnect: () => void,
  maxAttempts = 10,
  baseDelay = 1000
) {
  let attempts = 0;
  const schedule = () => {
    if (attempts >= maxAttempts) return;
    const delay = Math.min(baseDelay * 2 ** attempts, 30000);
    setTimeout(() => {
      attempts += 1;
      reconnect();
    }, delay);
  };
  return { schedule };
}
