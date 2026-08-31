import { useEffect, useRef, useState, useCallback } from "react";

export type WebSocketStatus = "connected" | "disconnected" | "reconnecting";

interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  onMessage?: (event: MessageEvent) => void;
  maxBackoff?: number; // ms
}

export const useWebSocket = ({
  url,
  protocols,
  onMessage,
  maxBackoff = 30000,
}: UseWebSocketOptions) => {
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef<number>(1000); // start at 1s
  const reconnectTimeout = useRef<number | null>(null);
  const isUnmounted = useRef(false);

  const clearReconnect = () => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  };

  const connect = useCallback(() => {
    if (isUnmounted.current) return;
    setStatus("reconnecting");
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      backoffRef.current = 1000; // reset backoff on successful connection
    };

    ws.onmessage = (event) => {
      onMessage?.(event);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      clearReconnect();
      const timeout = backoffRef.current;
      backoffRef.current = Math.min(backoffRef.current * 2, maxBackoff);
      reconnectTimeout.current = window.setTimeout(() => {
        connect();
      }, timeout);
    };

    ws.onerror = () => {
      // Trigger close to start reconnection flow
      ws.close();
    };
  }, [url, protocols, onMessage, maxBackoff]);

  useEffect(() => {
    isUnmounted.current = false;
    connect();
    return () => {
      isUnmounted.current = true;
      clearReconnect();
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback(
    (data: string | ArrayBuffer | Blob) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(data);
      } else {
        console.warn("WebSocket not open. Message not sent.");
      }
    },
    []
  );

  return { status, sendMessage };
};