import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook to manage a WebSocket connection with automatic reconnection using exponential backoff.
 * Returns a send function and the current connection status.
 */
export const useWebSocket = (
  url: string,
  onMessage: (msg: WebSocketMessage) => void
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    clearReconnectTimeout();
    const attempt = reconnectAttemptRef.current;
    const delay = Math.min(1000 * 2 ** attempt, 30000); // cap at 30 seconds
    reconnectTimeoutRef.current = window.setTimeout(() => {
      reconnectAttemptRef.current = attempt + 1;
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setStatus('connected');
      reconnectAttemptRef.current = 0; // reset backoff on successful connection
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    wsRef.current.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    wsRef.current.onerror = () => {
      // Errors also lead to close event; ensure socket is closed to trigger reconnection.
      wsRef.current?.close();
    };
  }, [url, onMessage, scheduleReconnect]);

  const send = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { send, status };
};