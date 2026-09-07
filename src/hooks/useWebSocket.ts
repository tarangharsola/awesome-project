import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

export interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  reconnectInterval?: number;
  onMessage?: (msg: WebSocketMessage) => void;
}

export interface WebSocketState {
  socket: WebSocket | null;
  isConnected: boolean;
}

/**
 * Hook to manage a WebSocket connection with automatic reconnection.
 */
export function useWebSocket({
  url,
  protocols,
  reconnectInterval = 3000,
  onMessage,
}: UseWebSocketOptions): WebSocketState {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    cleanup();

    const ws = new WebSocket(url, protocols);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onclose = () => {
      setIsConnected(false);
      // attempt reconnection
      reconnectTimeout.current = window.setTimeout(connect, reconnectInterval);
    };

    ws.onerror = () => {
      ws.close();
    };

    ws.onmessage = (event) => {
      if (onMessage) {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage;
          onMessage(data);
        } catch {
          // ignore malformed messages
        }
      }
    };

    socketRef.current = ws;
  }, [url, protocols, reconnectInterval, onMessage, cleanup]);

  useEffect(() => {
    connect();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  return { socket: socketRef.current, isConnected };
}
