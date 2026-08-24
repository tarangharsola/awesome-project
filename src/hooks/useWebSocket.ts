import { useEffect, useRef, useState, useCallback } from 'react';

export type WebSocketStatus = 'connected' | 'disconnected' | 'reconnecting';

interface UseWebSocketOptions {
  url: string;
  maxRetries?: number;
  maxDelay?: number; // maximum delay in ms
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection using
 * exponential backoff. It exposes the current socket instance, a sendMessage
 * helper and the connection status.
 */
export const useWebSocket = ({
  url,
  maxRetries = Infinity,
  maxDelay = 30000,
}: UseWebSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearPendingTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    setStatus('reconnecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };

    ws.onmessage = (event) => {
      // Message handling is delegated to consumers via the socket reference.
    };

    ws.onclose = () => {
      setStatus('disconnected');
      attemptReconnect();
    };

    ws.onerror = () => {
      // Ensure the socket is closed so onclose triggers reconnection logic.
      ws.close();
    };
  }, [url]);

  const attemptReconnect = () => {
    if (retryCountRef.current >= maxRetries) return;
    const delay = Math.min(1000 * 2 ** retryCountRef.current, maxDelay);
    retryCountRef.current += 1;
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  useEffect(() => {
    connect();
    return () => {
      clearPendingTimeout();
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  const sendMessage = useCallback((data: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    } else {
      console.warn('WebSocket is not open. Message not sent.');
    }
  }, []);

  return { socket: socketRef.current, sendMessage, status };
};