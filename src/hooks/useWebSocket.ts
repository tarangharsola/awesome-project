import { useEffect, useRef, useState, useCallback } from "react";

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

interface UseWebSocketOptions {
  url: string;
  onMessage: (event: MessageEvent) => void;
}

export const useWebSocket = ({ url, onMessage }: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    setConnectionStatus("connecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus("connected");
      reconnectAttemptsRef.current = 0;
      clearReconnectTimeout();
    };

    ws.onmessage = onMessage;

    ws.onclose = () => {
      setConnectionStatus("disconnected");
      scheduleReconnect();
    };

    ws.onerror = () => {
      setConnectionStatus("error");
      ws.close();
    };
  }, [url, onMessage]);

  const scheduleReconnect = () => {
    clearReconnectTimeout();
    const attempt = reconnectAttemptsRef.current + 1;
    reconnectAttemptsRef.current = attempt;
    const delay = Math.min(1000 * 2 ** (attempt - 1), 30000); // exponential backoff up to 30s
    reconnectTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = useCallback((msg: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  }, []);

  const reconnect = useCallback(() => {
    clearReconnectTimeout();
    if (wsRef.current) {
      wsRef.current.close();
    }
    reconnectAttemptsRef.current = 0;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      wsRef.current?.close();
    };
  }, [connect]);

  return { sendMessage, connectionStatus, reconnect };
};