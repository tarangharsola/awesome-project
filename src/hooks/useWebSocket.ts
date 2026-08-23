import { useEffect, useRef, useState, useCallback } from "react";

export type WebSocketStatus = "connected" | "disconnected" | "connecting";

interface UseWebSocketOptions {
  /** WebSocket endpoint URL */
  url: string;
  /** Maximum number of reconnection attempts (default: 10) */
  maxRetries?: number;
  /** Initial delay before first retry in ms (default: 1000) */
  initialDelay?: number;
  /** Upper bound for retry delay in ms (default: 30000) */
  maxDelay?: number;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection using
 * exponential back‑off. It exposes the socket instance, current connection status
 * and a safe sendMessage function.
 */
export const useWebSocket = ({
  url,
  maxRetries = 10,
  initialDelay = 1000,
  maxDelay = 30000,
}: UseWebSocketOptions) => {
  const [status, setStatus] = useState<WebSocketStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

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
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors are handled by closing the socket which triggers onclose.
      ws.close();
    };
  }, [url, scheduleReconnect]);

  const scheduleReconnect = useCallback(() => {
    if (retryCountRef.current >= maxRetries) {
      // Give up after maxRetries attempts.
      return;
    }
    const delay = Math.min(
      initialDelay * 2 ** retryCountRef.current,
      maxDelay
    );
    retryCountRef.current += 1;
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, [initialDelay, maxDelay, maxRetries, connect]);

  const sendMessage = useCallback((msg: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { socket: wsRef.current, status, sendMessage } as const;
};
