import { useState, useCallback } from 'react';

interface ReconnectionConfig {
  maxAttempts?: number;
  baseDelay?: number; // milliseconds
}

/**
 * Hook providing exponential backoff reconnection scheduling.
 */
export default function useReconnection({ maxAttempts = 10, baseDelay = 500 }: ReconnectionConfig = {}) {
  const [attempt, setAttempt] = useState(0);

  const scheduleReconnect = useCallback(
    (reconnectFn: () => void) => {
      if (attempt >= maxAttempts) {
        console.warn('Maximum reconnection attempts reached');
        return;
      }
      const delay = baseDelay * Math.pow(2, attempt);
      setTimeout(() => {
        setAttempt((a) => a + 1);
        reconnectFn();
      }, delay);
    },
    [attempt, maxAttempts, baseDelay]
  );

  const resetAttempts = useCallback(() => setAttempt(0), []);

  return { attempt, scheduleReconnect, resetAttempts };
}
