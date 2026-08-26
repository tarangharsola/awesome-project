import { useEffect, useRef, useState, useCallback } from 'react';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

/**
 * Hook that manages a WebSocket connection with automatic reconnection using exponential backoff.
 * Returns the current connection status, a sendMessage function, and the underlying WebSocket instance.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearPendingTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    // Exponential backoff: 1s, 2s, 4s, 8s, 10s (capped)
    const attempt = retryCountRef.current + 1;
    retryCountRef.current = attempt;
    const delay = Math.min(10000, 1000 * 2 ** (attempt - 1));
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    clearPendingTimeout();
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0; // reset backoff on successful connection
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors also trigger close which will schedule a reconnect
      ws.close();
    };
  }, [url, scheduleReconnect]);

  useEffect(() => {
    connect();
    return () => {
      clearPendingTimeout();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: unknown) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return { status, sendMessage, ws: wsRef.current } as const;
};