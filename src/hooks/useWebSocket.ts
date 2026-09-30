import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage, WebSocketEvent } from '../types/websocketMessage';
import { ConnectionStatus } from '../types/connection';

type UseWebSocketOptions = {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
};

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * Returns the current connection status and a send function.
 */
export const useWebSocket = ({
  url,
  onMessage,
  onOpen,
  onClose,
  onError,
  reconnectAttempts = 5,
  reconnectInterval = 2000,
}: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    setStatus('connecting');

    wsRef.current.onopen = () => {
      setStatus('connected');
      attemptsRef.current = 0;
      onOpen?.();
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // Silently ignore malformed messages
      }
    };

    wsRef.current.onclose = () => {
      setStatus('disconnected');
      onClose?.();
      if (attemptsRef.current < reconnectAttempts) {
        attemptsRef.current += 1;
        timeoutRef.current = window.setTimeout(connect, reconnectInterval);
      }
    };

    wsRef.current.onerror = (e) => {
      onError?.(e);
    };
  }, [url, onMessage, onOpen, onClose, onError, reconnectAttempts, reconnectInterval]);

  useEffect(() => {
    connect();
    return () => {
      clearTimer();
      wsRef.current?.close();
    };
  }, [connect]);

  const send = useCallback(
    (msg: WebSocketEvent) => {
      if (status === 'connected' && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(msg));
      }
    },
    [status]
  );

  return { status, send };
};
