import { useRef, useCallback } from 'react';

export const useReconnection = (reconnectFn: () => void) => {
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleReconnect = useCallback(() => {
    const delay = Math.min(1000 * 2 ** attemptsRef.current, 30000);
    attemptsRef.current += 1;
    timeoutRef.current = setTimeout(() => {
      reconnectFn();
    }, delay);
  }, [reconnectFn]);

  const cancelReconnect = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    attemptsRef.current = 0;
  }, []);

  return { scheduleReconnect, cancelReconnect };
};