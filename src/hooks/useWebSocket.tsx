import { useEffect, useRef, useState, useCallback } from 'react';

type MessageHandler = (msg: any) => void;

type WebSocketStatus = 'connected' | 'disconnected' | 'connecting';

export const useWebSocket = (url: string, onMessage: MessageHandler) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    setStatus('connecting');
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };

    wsRef.current.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    wsRef.current.onerror = () => {
      // Force close to trigger reconnection logic
      wsRef.current?.close();
    };
  }, [url, onMessage]);

  const scheduleReconnect = () => {
    const attempts = reconnectAttempts.current + 1;
    reconnectAttempts.current = attempts;
    const delay = Math.min(1000 * 2 ** attempts, maxDelay);
    setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = useCallback((msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, status };
};