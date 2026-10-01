import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

export interface UseWebSocketOptions {
  url: string;
  onMessage?: (msg: WebSocketMessage) => void;
  reconnectInterval?: number;
}

export const useWebSocket = ({ url, onMessage, reconnectInterval = 3000 }: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => setConnected(true);
    wsRef.current.onclose = () => {
      setConnected(false);
      setTimeout(connect, reconnectInterval);
    };
    wsRef.current.onerror = () => wsRef.current?.close();

    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage?.(data);
      } catch {
        // ignore malformed messages
      }
    };
  }, [url, onMessage, reconnectInterval]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return { connected, sendMessage };
};