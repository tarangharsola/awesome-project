import { useEffect, useRef, useState, useCallback } from "react";

export type ConnectionStatus = "connected" | "connecting" | "disconnected" | "error";

interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  reconnectAttempts?: number; // max attempts, undefined for infinite
  reconnectDelay?: number; // base delay in ms
  maxReconnectDelay?: number;
}

export const useWebSocket = ({
  url,
  protocols,
  reconnectAttempts = Infinity,
  reconnectDelay = 1000,
  maxReconnectDelay = 30000,
}: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [attempt, setAttempt] = useState(0);
  const reconnectTimeout = useRef<number | null>(null);

  const clearReconnect = () => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  };

  const connect = useCallback(() => {
    clearReconnect();
    setStatus("connecting");
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      setAttempt(0);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      if (attempt < reconnectAttempts) {
        const delay = Math.min(
          reconnectDelay * 2 ** attempt,
          maxReconnectDelay
        );
        reconnectTimeout.current = window.setTimeout(() => {
          setAttempt((a) => a + 1);
          connect();
        }, delay);
      }
    };

    ws.onerror = () => {
      setStatus("error");
      ws.close();
    };
  }, [url, protocols, attempt, reconnectAttempts, reconnectDelay, maxReconnectDelay]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnect();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = useCallback(
    (msg: string) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(msg);
      }
    },
    []
  );

  return { sendMessage, status, reconnect: connect };
};