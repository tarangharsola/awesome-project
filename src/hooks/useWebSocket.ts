import { useEffect, useRef, useState, useCallback } from "react";

export interface WebSocketOptions {
  url: string;
  reconnectInterval?: number;
  maxRetries?: number;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * Returns the socket instance, the latest message, and a send function.
 */
export function useWebSocket<T = any>(options: WebSocketOptions) {
  const { url, reconnectInterval = 2000, maxRetries = Infinity } = options;
  const socketRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<T | null>(null);
  const [connected, setConnected] = useState(false);
  const retriesRef = useRef(0);
  const reconnectTimeout = useRef<number | null>(null);

  const clearSocket = () => {
    if (socketRef.current) {
      socketRef.current.onopen = null;
      socketRef.current.onmessage = null;
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearSocket();
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      retriesRef.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as T;
        setMessage(data);
      } catch {
        // If not JSON, forward raw string
        setMessage((event.data as unknown) as T);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      if (retriesRef.current < maxRetries) {
        retriesRef.current += 1;
        reconnectTimeout.current = window.setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, reconnectInterval, maxRetries]);

  const send = useCallback(
    (data: any) => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(data));
      }
    },
    []
  );

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      clearSocket();
    };
  }, [connect]);

  return { socket: socketRef.current, message, send, connected };
}
