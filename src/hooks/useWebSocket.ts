import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook for managing a WebSocket connection with automatic reconnection using exponential backoff.
 *
 * @param url - The WebSocket endpoint URL.
 * @param onMessage - Callback invoked when a message is received from the server.
 * @returns An object containing the current connection status, a sendMessage function, and a manual retry trigger.
 */
export function useWebSocket<T = any>(
  url: string,
  onMessage: (msg: T) => void
) {
  type Status = 'connecting' | 'connected' | 'disconnected';

  const [status, setStatus] = useState<Status>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const maxDelay = 30000; // 30 seconds maximum backoff

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    clearReconnectTimeout();
    const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), maxDelay);
    retryCountRef.current += 1;
    reconnectTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0; // reset backoff on successful connection
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as T;
        onMessage(data);
      } catch (e) {
        // If parsing fails, forward raw data
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onMessage(event.data);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors also lead to close which triggers reconnection logic
      ws.close();
    };
  }, [url, onMessage, scheduleReconnect]);

  const sendMessage = useCallback((msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const manualRetry = useCallback(() => {
    clearReconnectTimeout();
    retryCountRef.current = 0;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { status, sendMessage, manualRetry } as const;
}
