import { useEffect, useRef, useState, useCallback } from 'react';

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

interface UseWebSocketOptions {
  url: string;
  onMessage: (event: MessageEvent) => void;
  protocols?: string | string[];
}

export const useWebSocket = ({ url, onMessage, protocols }: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    setStatus('reconnecting');
    wsRef.current = new WebSocket(url, protocols);
    wsRef.current.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
    };
    wsRef.current.onmessage = onMessage;
    wsRef.current.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, protocols, onMessage]);

  const scheduleReconnect = () => {
    reconnectAttempts.current += 1;
    const delay = Math.min(1000 * 2 ** (reconnectAttempts.current - 1), maxDelay);
    setTimeout(() => {
      connect();
    }, delay);
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((data: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  return { sendMessage, status } as const;
};