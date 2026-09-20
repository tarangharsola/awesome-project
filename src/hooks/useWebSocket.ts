import { useEffect, useRef, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';
import type { User } from '../types';

export interface UseWebSocketOptions {
  url: string;
  onMessage?: (msg: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 */
export function useWebSocket<T = any>(options: UseWebSocketOptions) {
  const { url, onMessage, onOpen, onClose, onError } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxAttempts = 5;

  const sendMessage = useCallback((data: T) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        reconnectAttempts.current = 0;
        onOpen?.();
      };

      wsRef.current.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data) as WebSocketMessage;
          onMessage?.(parsed);
        } catch {
          // ignore malformed messages
        }
      };

      wsRef.current.onclose = () => {
        onClose?.();
        if (isMounted && reconnectAttempts.current < maxAttempts) {
          reconnectAttempts.current += 1;
          const timeout = Math.pow(2, reconnectAttempts.current) * 1000;
          setTimeout(connect, timeout);
        }
      };

      wsRef.current.onerror = (e) => {
        onError?.(e);
      };
    };

    connect();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  return { sendMessage };
}
