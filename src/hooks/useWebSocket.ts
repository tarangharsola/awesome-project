import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  maxBackoff?: number; // maximum backoff in ms
}

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

export const useWebSocket = ({ url, protocols, maxBackoff = 30000 }: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [attempt, setAttempt] = useState<number>(0);
  const backoffRef = useRef<number>(1000); // start with 1s
  const reconnectTimeout = useRef<number | null>(null);

  const clearReconnect = () => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  };

  const connect = useCallback(() => {
    clearReconnect();
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;
    setStatus('reconnecting');
    setAttempt((prev) => prev + 1);

    ws.onopen = () => {
      setStatus('connected');
      setAttempt(0);
      backoffRef.current = 1000; // reset backoff
    };

    ws.onmessage = (event: MessageEvent) => {
      // Consumers can add their own listeners via returned wsRef
      // No default handling here
    };

    ws.onerror = () => {
      // Errors will trigger onclose which handles reconnection
    };

    ws.onclose = () => {
      setStatus('disconnected');
      // schedule reconnection with exponential backoff
      const delay = Math.min(backoffRef.current, maxBackoff);
      reconnectTimeout.current = window.setTimeout(() => {
        connect();
      }, delay);
      backoffRef.current = Math.min(backoffRef.current * 2, maxBackoff);
    };
  }, [url, protocols, maxBackoff]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  }, []);

  const manualRetry = useCallback(() => {
    if (status !== 'connected') {
      connect();
    }
  }, [status, connect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnect();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    socket: wsRef.current,
    status,
    attempt,
    sendMessage,
    retry: manualRetry,
  } as const;
};
