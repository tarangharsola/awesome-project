import { useEffect, useRef, useState, useCallback } from 'react';

export type WebSocketStatus = 'connected' | 'disconnected' | 'reconnecting';

interface UseWebSocketReturn {
  ws: WebSocket | null;
  status: WebSocketStatus;
  sendMessage: (msg: string) => void;
  reconnect: () => void;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const maxDelay = 30000; // 30 seconds

  const clearWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onclose = null;
      wsRef.current.onerror = null;
      wsRef.current.onmessage = null;
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    const delay = Math.min(1000 * 2 ** retryCountRef.current, maxDelay);
    retryCountRef.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('reconnecting');
    clearWebSocket();
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, scheduleReconnect]);

  const sendMessage = useCallback((msg: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  }, []);

  const reconnect = useCallback(() => {
    retryCountRef.current = 0;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      clearWebSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { ws: wsRef.current, status, sendMessage, reconnect };
};