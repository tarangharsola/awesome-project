import { useState, useRef, useCallback } from 'react';

/**
 * Hook that provides exponential‑backoff reconnection scheduling.
 * `onReconnect` is invoked after the calculated delay.
 * The hook returns the current attempt count, a `schedule` function to
 * start a new reconnection timer, and a `reset` function to clear state
 * after a successful connection.
 */
export function useReconnection(onReconnect: () => void) {
  const [attempt, setAttempt] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const schedule = useCallback(() => {
    const delay = Math.min(1000 * 2 ** attempt, 30000); // cap at 30s
    timeoutRef.current = setTimeout(() => {
      setAttempt((a) => a + 1);
      onReconnect();
    }, delay);
  }, [attempt, onReconnect]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAttempt(0);
  }, []);

  return { attempt, schedule, reset };
}
