import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';

export const useReconnection = (url: string) => {
  const { socket, isConnected, sendMessage } = useWebSocket(url);
  const attempts = useRef(0);

  useEffect(() => {
    if (!isConnected && attempts.current < 5) {
      const timer = setTimeout(() => {
        attempts.current += 1;
        // Re-instantiating the hook will create a new WebSocket connection.
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  return { socket, isConnected, sendMessage };
};