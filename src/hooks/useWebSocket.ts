import { useEffect, useRef, useState, useCallback } from "react";
import { WebSocketMessage } from "../types/websocketMessage";

export type WebSocketStatus = "connected" | "connecting" | "disconnected";

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It exposes the connection status and a safe sendMessage function.
 */
export const useWebSocket = (
  url: string,
  onMessage: (msg: WebSocketMessage) => void
) => {
  const [status, setStatus] = useState<WebSocketStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const connect = useCallback(() => {
    setStatus("connecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // Silently ignore malformed messages
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, onMessage]);

  const scheduleReconnect = useCallback(() => {
    const attempts = reconnectAttempts.current + 1;
    reconnectAttempts.current = attempts;
    const delay = Math.min(1000 * 2 ** attempts, maxDelay);
    setTimeout(() => {
      connect();
    }, delay);
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { status, sendMessage } as const;
};