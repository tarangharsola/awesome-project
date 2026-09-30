import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

// Configuration for reconnection backoff
const RECONNECT_BASE_MS = 1000; // 1 second
const RECONNECT_MAX_MS = 30000; // 30 seconds

/**
 * Custom hook managing a WebSocket connection with automatic reconnection using exponential backoff.
 * Returns the socket instance, connection status, a send function, and a manual retry trigger.
 */
export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearReconnectTimeout();
    setStatus('connecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      setReconnectAttempts(0);
    };

    ws.onmessage = (event: MessageEvent) => {
      // Consumers can add their own listeners via the returned socket reference.
      // This hook does not process messages directly.
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors also lead to a closed socket; onclose will handle reconnection.
    };
  }, [url]);

  const scheduleReconnect = useCallback(() => {
    const attempts = reconnectAttempts + 1;
    setReconnectAttempts(attempts);
    const delay = Math.min(RECONNECT_BASE_MS * 2 ** (attempts - 1), RECONNECT_MAX_MS);
    reconnectTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, [reconnectAttempts, connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  }, []);

  const retryNow = useCallback(() => {
    clearReconnectTimeout();
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    socket: socketRef.current,
    status,
    sendMessage,
    retryNow,
    reconnectAttempts,
  } as const;
}
