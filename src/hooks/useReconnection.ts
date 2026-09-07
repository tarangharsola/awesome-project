import { useEffect, useRef } from 'react';
import { useWebSocket, UseWebSocketOptions } from './useWebSocket';

/**
 * Convenience hook that wraps useWebSocket with reconnection logic.
 * It forwards all options to the underlying hook.
 */
export function useReconnection(options: UseWebSocketOptions) {
  const { socket, isConnected } = useWebSocket(options);

  // Expose a stable reference for consumers that may need the socket instance.
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  return { socket: socketRef.current, isConnected };
}
