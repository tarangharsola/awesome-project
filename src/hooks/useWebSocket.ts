import { useEffect, useRef, useState, useCallback } from "react";

export type WebSocketStatus = "connecting" | "connected" | "disconnected";

interface UseWebSocketOptions {
  url: string;
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
}

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 */
export function useWebSocket(
  { url, maxRetries = Infinity, initialDelayMs = 1000, maxDelayMs = 30000 }: UseWebSocketOptions
) {
  const [status, setStatus] = useState<WebSocketStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const backoffTimeoutRef = useRef<number | null>(null);

  const clearBackoff = () => {
    if (backoffTimeoutRef.current !== null) {
      clearTimeout(backoffTimeoutRef.current);
      backoffTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    setStatus("connecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      retryCountRef.current = 0;
    };

    ws.onclose = () => {
      setStatus("disconnected");
      attemptReconnect();
    };

    ws.onerror = () => {
      // Errors also trigger close; ensure we close to start reconnection.
      ws.close();
    };
  }, [url]);

  const attemptReconnect = () => {
    if (retryCountRef.current >= maxRetries) {
      return;
    }
    const delay = Math.min(
      initialDelayMs * 2 ** retryCountRef.current,
      maxDelayMs
    );
    retryCountRef.current += 1;
    clearBackoff();
    backoffTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = useCallback(
    (msg: string) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(msg);
      } else {
        console.warn("WebSocket not open. Message dropped:", msg);
      }
    },
    []
  );

  useEffect(() => {
    connect();
    return () => {
      clearBackoff();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  return { status, sendMessage };
}
