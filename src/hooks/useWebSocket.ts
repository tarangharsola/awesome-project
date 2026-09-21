import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

type Options = {
  reconnectAttempts?: number;
  reconnectInterval?: number;
};

/**
 * useWebSocket – a lightweight hook for managing a WebSocket connection with
 * automatic reconnection and typed message handling.
 *
 * @param url - The WebSocket endpoint URL.
 * @param onMessage - Callback invoked with parsed messages.
 * @param options - Optional reconnection configuration.
 * @returns Connection status and a sendMessage function.
 */
export const useWebSocket = (
  url: string,
  onMessage: (msg: WebSocketMessage) => void,
  options: Options = {}
) => {
  const { reconnectAttempts = 5, reconnectInterval = 2000 } = options;
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setIsConnected(true);
      attemptsRef.current = 0;
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // Silently ignore malformed messages.
      }
    };
    wsRef.current.onclose = () => {
      setIsConnected(false);
      if (attemptsRef.current < reconnectAttempts) {
        attemptsRef.current += 1;
        timeoutRef.current = window.setTimeout(connect, reconnectInterval);
      }
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, onMessage, reconnectAttempts, reconnectInterval]);

  useEffect(() => {
    connect();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback(
    (msg: WebSocketMessage) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(msg));
      }
    },
    []
  );

  return { isConnected, sendMessage } as const;
};

export default useWebSocket;
