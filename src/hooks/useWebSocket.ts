import { useEffect, useRef, useState } from 'react';

type MessageHandler = (event: MessageEvent) => void;

/**
 * useWebSocket hook provides a resilient WebSocket connection with automatic
 * reconnection using exponential backoff. It exposes a send function, connection
 * status, and the current reconnection attempt count.
 */
export function useWebSocket(url: string, onMessage: MessageHandler) {
  const [connected, setConnected] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);

  const maxDelay = 30000; // 30 seconds maximum backoff

  const connect = () => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setAttempt(0);
    };

    ws.onmessage = onMessage;

    ws.onclose = () => {
      setConnected(false);
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Close the socket to trigger onclose and reconnection logic
      ws.close();
    };
  };

  const scheduleReconnect = () => {
    const delay = Math.min(1000 * 2 ** attempt, maxDelay);
    reconnectTimeout.current = window.setTimeout(() => {
      setAttempt(prev => prev + 1);
      connect();
    }, delay);
  };

  const send = (data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { send, connected, attempt };
}
