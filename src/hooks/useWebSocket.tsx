import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';
import type { User } from '../types';

/**
 * Hook to manage a WebSocket connection with automatic reconnection, message queuing,
 * and initial user presence broadcast.
 */
export function useWebSocket(url: string, user: User) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const pendingMessages = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const maxBackoff = 30000; // 30 seconds

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      pendingMessages.current.push(msg);
    }
  }, []);

  const flushQueue = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      pendingMessages.current.forEach((msg) => wsRef.current?.send(JSON.stringify(msg)));
      pendingMessages.current = [];
    }
  }, []);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
      // Broadcast presence immediately after connection
      sendMessage({ type: 'presence', payload: { user } });
      flushQueue();
    };
    wsRef.current.onmessage = (event) => {
      // Consumers will attach their own listeners via returned wsRef
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      // Schedule reconnection with exponential backoff
      const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, maxBackoff);
      reconnectAttempts.current += 1;
      setTimeout(connect, timeout);
    };
    wsRef.current.onerror = () => {
      // Errors also trigger close which will start reconnection
      wsRef.current?.close();
    };
  }, [url, sendMessage, flushQueue, user]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return { ws: wsRef.current, connected, sendMessage } as const;
}
