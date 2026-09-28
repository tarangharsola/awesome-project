import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

/**
 * useWebSocket – establishes a WebSocket connection with automatic reconnection
 * using exponential backoff. Returns the socket instance, current connection
 * status, and a helper to send typed messages.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef<number>(1000); // start with 1s
  const maxBackoff = 30000; // cap at 30s

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      backoffRef.current = 1000; // reset backoff on successful connection
    };

    ws.onmessage = (event: MessageEvent) => {
      // Consumers can attach listeners via wsRef.current if needed.
    };

    ws.onclose = () => {
      setStatus('disconnected');
      const delay = backoffRef.current;
      setTimeout(() => {
        connect();
      }, delay);
      backoffRef.current = Math.min(backoffRef.current * 2, maxBackoff);
    };

    ws.onerror = () => {
      // Close will trigger reconnection logic in onclose.
      ws.close();
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return { socket: wsRef.current, status, sendMessage } as const;
};