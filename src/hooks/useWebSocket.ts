import { useEffect, useRef, useState } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

export interface UseWebSocketOptions {
  /** WebSocket endpoint URL */
  url: string;
  /** Callback invoked for every parsed incoming message */
  onMessage: (msg: WebSocketMessage) => void;
  /** Milliseconds between reconnection attempts (default: 3000) */
  reconnectInterval?: number;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * Returns the connection status and a typed send function.
 */
export const useWebSocket = ({
  url,
  onMessage,
  reconnectInterval = 3000,
}: UseWebSocketOptions) => {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  useEffect(() => {
    const connect = () => {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        setConnected(true);
      };

      wsRef.current.onclose = () => {
        setConnected(false);
        // Schedule reconnection
        reconnectTimer.current = window.setTimeout(connect, reconnectInterval);
      };

      wsRef.current.onerror = () => {
        // Force close to trigger reconnection logic
        wsRef.current?.close();
      };

      wsRef.current.onmessage = (event: MessageEvent) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          onMessage(data);
        } catch {
          // Silently ignore malformed messages
        }
      };
    };

    connect();

    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps – url and onMessage are stable in usage contexts
  }, [url, onMessage, reconnectInterval]);

  return { connected, sendMessage } as const;
};
