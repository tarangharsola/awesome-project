import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

/**
 * useWebSocket hook with automatic reconnection using exponential backoff.
 * Returns a sendMessage function and the current connection status.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Close will trigger onclose which handles reconnection
      ws.close();
    };
  }, [url]);

  const scheduleReconnect = () => {
    const attempt = ++reconnectAttempts.current;
    const delay = Math.min(1000 * 2 ** (attempt - 1), maxDelay);
    setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, status } as const;
};