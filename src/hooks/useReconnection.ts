import { useRef, useCallback } from 'react';

export default function useReconnection(connectFn: () => void) {
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const maxDelay = 30000; // 30 seconds

  const scheduleReconnect = useCallback(() => {
    const delay = Math.min(1000 * 2 ** attemptsRef.current, maxDelay);
    attemptsRef.current += 1;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      connectFn();
    }, delay);
  }, [connectFn]);

  const reset = useCallback(() => {
    attemptsRef.current = 0;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { scheduleReconnect, reset };
}
