import { useEffect, useState } from "react";

/**
 * Hook that provides exponential‑backoff reconnection state.
 * Consumers can watch `connected` to know when the underlying transport
 * is considered healthy. The `attempt` counter can be used to trigger
 * side‑effects (e.g., re‑fetching document state) after each retry.
 */
export const useReconnection = (isOnline: boolean) => {
  const [connected, setConnected] = useState(isOnline);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (isOnline) {
      setConnected(true);
      setAttempt(0);
      return;
    }
    // When offline, schedule a retry with exponential back‑off
    const delay = Math.min(1000 * 2 ** attempt, 30000);
    const timer = setTimeout(() => {
      setAttempt((a) => a + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [isOnline, attempt]);

  return { connected, attempt };
};