import { useEffect, useRef, useState } from 'react';

type MessageHandler = (msg: any) => void;

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It provides a send function and a connected flag.
 */
export function useWebSocket(url: string, onMessage: MessageHandler) {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const maxRetry = 5; // limit exponential backoff attempts

  const connect = () => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      retryRef.current = 0; // reset backoff on successful connection
    };

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setConnected(false);
      // exponential backoff reconnection
      if (retryRef.current < maxRetry) {
        const timeout = Math.min(1000 * 2 ** retryRef.current, 30000);
        setTimeout(connect, timeout);
        retryRef.current += 1;
      }
    };

    ws.onerror = () => {
      ws.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const send = (msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { send, connected };
}
