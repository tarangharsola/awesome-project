import { useEffect, useRef, useState, useCallback } from "react";

type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

interface UseWebSocketOptions {
  url: string;
  onMessage?: (event: MessageEvent) => void;
  protocols?: string | string[];
  maxBackoff?: number; // ms
  initialBackoff?: number; // ms
}

export function useWebSocket({
  url,
  onMessage,
  protocols,
  maxBackoff = 30000,
  initialBackoff = 1000,
}: UseWebSocketOptions) {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef<number>(initialBackoff);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const isUnmountedRef = useRef(false);

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    if (isUnmountedRef.current) return;
    setStatus("reconnecting");
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      backoffRef.current = initialBackoff;
    };

    ws.onmessage = (event) => {
      onMessage?.(event);
    };

    const handleClose = () => {
      setStatus("disconnected");
      wsRef.current = null;
      scheduleReconnect();
    };

    ws.onclose = handleClose;
    ws.onerror = () => {
      ws.close();
    };
  }, [url, protocols, onMessage, initialBackoff]);

  const scheduleReconnect = () => {
    clearReconnectTimeout();
    const backoff = Math.min(backoffRef.current, maxBackoff);
    // jitter +/-10%
    const jitter = backoff * (Math.random() * 0.2 - 0.1);
    const delay = backoff + jitter;
    reconnectTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
    backoffRef.current = Math.min(backoff * 2, maxBackoff);
  };

  const sendMessage = useCallback(
    (data: string | ArrayBuffer | Blob) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(data);
      } else {
        console.warn("WebSocket is not open. Message not sent.");
      }
    },
    []
  );

  useEffect(() => {
    isUnmountedRef.current = false;
    connect();

    return () => {
      isUnmountedRef.current = true;
      clearReconnectTimeout();
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { status, sendMessage };
}
