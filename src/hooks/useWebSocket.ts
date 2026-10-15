import { useEffect, useRef, useState } from 'react';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'retrying';

interface UseWebSocketOptions {
  /** WebSocket endpoint URL */
  url: string;
  /** Maximum backoff delay in milliseconds (default 30 000 ms) */
  maxBackoff?: number;
  /** Maximum number of reconnection attempts (default Infinity) */
  maxAttempts?: number;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection using
 * exponential back‑off. It exposes the socket instance, current connection
 * status, a manual close function, and the number of retry attempts performed.
 */
export const useWebSocket = ({
  url,
  maxBackoff = 30000,
  maxAttempts = Infinity,
}: UseWebSocketOptions) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const attemptRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const manualCloseRef = useRef(false);

  const connect = () => {
    setStatus(attemptRef.current === 0 ? 'connecting' : 'retrying');
    const ws = new WebSocket(url);

    ws.onopen = () => {
      attemptRef.current = 0;
      setStatus('connected');
    };

    ws.onclose = () => {
      setSocket(null);
      if (manualCloseRef.current) {
        setStatus('disconnected');
        return;
      }
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors are followed by a close event; we close explicitly to trigger reconnection.
      ws.close();
    };

    setSocket(ws);
  };

  const scheduleReconnect = () => {
    if (attemptRef.current >= maxAttempts) {
      setStatus('disconnected');
      return;
    }
    const delay = Math.min(1000 * 2 ** attemptRef.current, maxBackoff);
    attemptRef.current += 1;
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  const close = () => {
    manualCloseRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    socket?.close();
    setStatus('disconnected');
  };

  useEffect(() => {
    connect();
    return () => {
      manualCloseRef.current = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      socket?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    socket,
    status,
    close,
    /** Number of reconnection attempts performed since the last successful connection */
    retryAttempts: attemptRef.current,
  };
};