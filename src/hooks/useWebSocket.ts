import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

interface UseWebSocketOptions {
  url: string;
  reconnectIntervalMs?: number;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It exposes the current connection status, a send function and the
 * latest received message.
 */
export function useWebSocket({ url, reconnectIntervalMs = 3000 }: UseWebSocketOptions) {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
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
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => {
      setConnected(false);
      // Attempt reconnection after a delay.
      reconnectTimeout.current = window.setTimeout(connect, reconnectIntervalMs);
    };
    ws.onerror = () => ws.close();
    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setLastMessage(data);
      } catch {
        // ignore malformed messages
      }
    };
  }, [url, reconnectIntervalMs, cleanup]);

  useEffect(() => {
    connect();
    return cleanup;
  }, [connect, cleanup]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return { connected, lastMessage, sendMessage };
}
