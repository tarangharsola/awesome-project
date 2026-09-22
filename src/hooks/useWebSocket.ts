import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

/**
 * Hook to manage a WebSocket connection with automatic reconnection using exponential backoff.
 * Returns the current socket instance, connection status, a sendMessage helper, and a manual retry function.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    setStatus('reconnecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };

    ws.onmessage = (event: MessageEvent) => {
      // Placeholder for message handling – callers can attach their own listeners via wsRef.current
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Force close to trigger reconnection logic
      ws.close();
    };
  }, [url]);

  const scheduleReconnect = () => {
    const attempt = retryCountRef.current + 1;
    retryCountRef.current = attempt;
    const delay = Math.min(1000 * 2 ** (attempt - 1), 30000); // cap at 30s
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  const retry = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { socket: wsRef.current, status, sendMessage, retry };
};