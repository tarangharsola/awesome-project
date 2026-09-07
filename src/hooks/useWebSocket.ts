import { useEffect, useRef, useState, useCallback } from "react";

export type WebSocketStatus = "connecting" | "connected" | "disconnected";

export interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  onMessage?: (event: MessageEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (event: Event) => void;
}

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 */
export function useWebSocket({
  url,
  protocols,
  onMessage,
  onOpen,
  onClose,
  onError,
}: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const attemptRef = useRef(0);
  const [status, setStatus] = useState<WebSocketStatus>("connecting");

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearReconnectTimeout();
    setStatus("connecting");
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      attemptRef.current = 0;
      setStatus("connected");
      onOpen?.();
    };

    ws.onmessage = (event) => {
      onMessage?.(event);
    };

    ws.onerror = (event) => {
      onError?.(event);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      onClose?.();
      // schedule reconnection with exponential backoff
      const delay = Math.min(1000 * 2 ** attemptRef.current, 30000);
      attemptRef.current += 1;
      reconnectTimeoutRef.current = window.setTimeout(() => {
        connect();
      }, delay);
    };
  }, [url, protocols, onMessage, onOpen, onClose, onError]);

  // initial connection
  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, protocols]);

  const sendMessage = useCallback(
    (data: string) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(data);
      } else {
        console.warn("WebSocket is not open. Message not sent.");
      }
    },
    []
  );

  const manualReconnect = useCallback(() => {
    if (status !== "connected") {
      wsRef.current?.close();
      // reset attempt counter for immediate retry
      attemptRef.current = 0;
      connect();
    }
  }, [status, connect]);

  return { status, sendMessage, manualReconnect };
}
