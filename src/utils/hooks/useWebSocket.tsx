import { useEffect, useRef, useState, useCallback } from 'react';

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

/**
 * Hook to manage a WebSocket connection with automatic reconnection and backoff.
 * Returns a send function and the current connection status.
 */
export const useWebSocket = (
  url: string,
  onMessage: (msg: MessageEvent) => void
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const scheduleReconnect = useCallback(() => {
    const attempts = reconnectAttempts.current + 1;
    reconnectAttempts.current = attempts;
    const delay = Math.min(1000 * 2 ** attempts, maxDelay);
    setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('reconnecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
    };

    ws.onmessage = onMessage;

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors also trigger onclose, but we close explicitly to ensure cleanup.
      ws.close();
    };
  }, [url, onMessage, scheduleReconnect]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = useCallback((data: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  return { send, status } as const;
};