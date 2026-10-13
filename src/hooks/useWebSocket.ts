import { useEffect, useRef, useState } from 'react';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

interface UseWebSocketOptions {
  /** URL of the WebSocket endpoint */
  url: string;
  /** Callback invoked for each incoming message */
  onMessage: (msg: any) => void;
  /** Optional maximum reconnection attempts (0 = unlimited) */
  maxRetries?: number;
  /** Optional base delay in ms for exponential backoff */
  baseDelay?: number;
}

/**
 * Hook that manages a resilient WebSocket connection.
 * It automatically reconnects with exponential backoff, emits connection status,
 * and re‑synchronises the document and presence on successful reconnection.
 */
export function useWebSocket({ url, onMessage, maxRetries = 0, baseDelay = 500 }: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const retriesRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');

  const sendMessage = (msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const clearReconnectTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleReconnect = () => {
    if (maxRetries && retriesRef.current >= maxRetries) {
      setStatus('disconnected');
      return;
    }
    const delay = baseDelay * Math.pow(2, retriesRef.current);
    retriesRef.current += 1;
    timeoutRef.current = window.setTimeout(() => {
      initWebSocket();
    }, delay);
  };

  const initWebSocket = () => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      retriesRef.current = 0;
      setStatus('connected');
      // Request full document sync and presence list after reconnect
      sendMessage({ type: 'sync-request' });
      sendMessage({ type: 'presence-sync-request' });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      clearReconnectTimeout();
      scheduleReconnect();
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
      ws.close();
    };
  };

  useEffect(() => {
    initWebSocket();
    return () => {
      clearReconnectTimeout();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { status, sendMessage };
}
