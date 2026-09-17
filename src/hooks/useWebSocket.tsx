import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

type UseWebSocketReturn = {
  sendMessage: (msg: WebSocketMessage) => void;
  status: 'connected' | 'connecting' | 'disconnected';
};

/**
 * Hook that manages a WebSocket connection with automatic reconnection using
 * exponential back‑off. It also exposes the current connection status for UI
 * components.
 */
export const useWebSocket = (url: string): UseWebSocketReturn => {
  const [status, setStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<number | null>(null);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      // Consumers can listen to messages via custom events or a shared store.
      // This hook purposefully does not dispatch messages to keep it lightweight.
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Treat any error as a closed connection to trigger reconnection.
      ws.close();
    };
  }, [url]);

  const scheduleReconnect = () => {
    const attempt = reconnectAttempts.current + 1;
    reconnectAttempts.current = attempt;
    // Exponential back‑off: 1s, 2s, 4s, 8s, ... capped at 30s.
    const delay = Math.min(1000 * 2 ** (attempt - 1), 30000);
    reconnectTimeout.current = window.setTimeout(() => {
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
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, status };
};