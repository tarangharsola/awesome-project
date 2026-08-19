import { useCallback, useRef, useState } from 'react';

/**
 * Exponential back‑off reconnection helper.
 *
 * @param reconnect   Function that attempts to re‑establish the connection.
 * @param initialDelay Starting delay in ms (default 1000).
 * @param maxDelay    Maximum delay in ms (default 30000).
 * @returns           { attempt, schedule, reset }
 */
export const useReconnection = (
  reconnect: () => void,
  initialDelay = 1000,
  maxDelay = 30000
) => {
  const [attempt, setAttempt] = useState(0);
  const delayRef = useRef(initialDelay);
  const timeoutRef = useRef<number | null>(null);

  const schedule = useCallback(() => {
    const delay = delayRef.current;
    timeoutRef.current = window.setTimeout(() => {
      setAttempt((a) => a + 1);
      reconnect();
      delayRef.current = Math.min(delayRef.current * 2, maxDelay);
    }, delay);
  }, [reconnect, maxDelay]);

  const reset = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    delayRef.current = initialDelay;
    setAttempt(0);
  }, [initialDelay]);

  return { attempt, schedule, reset };
};

export default useReconnection;
