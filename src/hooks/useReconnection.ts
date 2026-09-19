import { useRef } from 'react';

/**
 * Hook providing exponential backoff reconnection strategy.
 * Returns a function to attempt reconnection and a reset function to clear backoff state.
 */
export function useReconnection() {
  const attemptsRef = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const attemptReconnect = (connectFn: () => void) => {
    const delay = Math.min(1000 * 2 ** attemptsRef.current, maxDelay);
    attemptsRef.current += 1;
    setTimeout(() => {
      connectFn();
    }, delay);
  };

  const reset = () => {
    attemptsRef.current = 0;
  };

  return { attemptReconnect, reset };
}
