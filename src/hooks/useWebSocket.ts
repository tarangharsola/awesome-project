import { useEffect, useRef, useState, useCallback } from 'react';

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  /** Maximum delay between reconnection attempts in milliseconds (default 30000) */
  maxRetryDelay?: number;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection using
 * exponential back‑off. It returns the live socket instance, the current
 * connection status, a sendMessage helper and a manual reconnect trigger.
 */
export const useWebSocket = (options: UseWebSocketOptions) => {
  const { url, protocols, maxRetryDelay = 30000 } = options;
  const [status, setStatus] = useState<WebSocketStatus>('connecting');
  const socketRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    setStatus(prev => (prev === 'disconnected' ? 'reconnecting' : 'connecting'));
    const ws = new WebSocket(url, protocols);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors are handled by the close event; no extra handling needed.
    };
  }, [url, protocols, scheduleReconnect]);

  const scheduleReconnect = useCallback(() => {
    clearTimer();
    const delay = Math.min(1000 * 2 ** retryCountRef.current, maxRetryDelay);
    timeoutRef.current = window.setTimeout(() => {
      retryCountRef.current += 1;
      connect();
    }, delay);
  }, [connect, maxRetryDelay]);

  const sendMessage = useCallback((data: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    } else {
      console.warn('WebSocket is not open. Message not sent.');
    }
  }, []);

  const manualReconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
    retryCountRef.current = 0;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      clearTimer();
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, protocols]);

  return { socket: socketRef.current, status, sendMessage, reconnect: manualReconnect };
};
