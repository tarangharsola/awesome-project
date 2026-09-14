import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage, WebSocketEvent } from '../types/websocketMessage';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

interface UseWebSocketOptions {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
}

export const useWebSocket = ({ url, onMessage, onOpen, onClose, onError }: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<number | null>(null);

  const clearReconnect = () => {
    if (reconnectTimeout.current !== null) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  };

  const connect = useCallback(() => {
    setStatus('connecting');
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
      clearReconnect();
      onOpen && onOpen();
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    wsRef.current.onclose = (event: CloseEvent) => {
      setStatus('disconnected');
      onClose && onClose();
      scheduleReconnect();
    };

    wsRef.current.onerror = (event: Event) => {
      console.error('WebSocket error', event);
      onError && onError(event);
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  const scheduleReconnect = () => {
    clearReconnect();
    const attempt = ++reconnectAttempts.current;
    const delay = Math.min(1000 * 2 ** attempt, 30000); // exponential backoff, max 30s
    reconnectTimeout.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket not open. Message not sent.', msg);
    }
  }, []);

  const manualRetry = useCallback(() => {
    if (status !== 'connected') {
      clearReconnect();
      connect();
    }
  }, [status, connect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnect();
      wsRef.current && wsRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, sendMessage, manualRetry } as const;
};