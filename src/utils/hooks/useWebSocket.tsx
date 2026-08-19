import { useEffect, useRef, useState } from 'react';

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 * It provides a `send` function and a `connected` boolean flag.
 */
export const useWebSocket = (url: string, onMessage: (msg: MessageEvent) => void) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = () => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
    };
    wsRef.current.onmessage = onMessage;
    wsRef.current.onclose = () => {
      setConnected(false);
      scheduleReconnect();
    };
    wsRef.current.onerror = () => {
      // Force close to trigger reconnection logic
      wsRef.current?.close();
    };
  };

  const scheduleReconnect = () => {
    const delay = Math.min(1000 * 2 ** reconnectAttempts.current, maxDelay);
    reconnectAttempts.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  };

  const send = (data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { send, connected };
};