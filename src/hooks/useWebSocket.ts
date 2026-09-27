import { useEffect, useRef, useState, useCallback } from "react";

export type ConnectionStatus = "connected" | "connecting" | "disconnected";

type UseWebSocketOptions = {
  onMessage?: (event: MessageEvent) => void;
};

export const useWebSocket = (url: string, options: UseWebSocketOptions = {}) => {
  const { onMessage } = options;
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const backoffTimeout = useRef<number | null>(null);

  const connect = useCallback(() => {
    setStatus("connecting");
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setStatus("connected");
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      if (onMessage) {
        onMessage(event);
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };

    socketRef.current = ws;
  }, [url, onMessage]);

  const scheduleReconnect = () => {
    const attempt = reconnectAttempts.current + 1;
    reconnectAttempts.current = attempt;
    const baseDelay = 1000; // 1 second
    const maxDelay = 30000; // 30 seconds
    const delay = Math.min(baseDelay * 2 ** (attempt - 1), maxDelay);
    backoffTimeout.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (backoffTimeout.current) {
        clearTimeout(backoffTimeout.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  return { socket: socketRef.current, status, sendMessage };
};