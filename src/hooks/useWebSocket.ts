import { useEffect, useRef, useState, useCallback } from "react";

export type ConnectionStatus = "connected" | "connecting" | "disconnected";

interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  onMessage?: (event: MessageEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (event: Event) => void;
}

/**
 * Hook that manages a WebSocket connection with automatic exponential backoff
 * reconnection. It provides the current connection status, a send function, and
 * explicit reconnect/disconnect controls.
 */
export const useWebSocket = ({
  url,
  protocols,
  onMessage,
  onOpen,
  onClose,
  onError,
}: UseWebSocketOptions) => {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const maxDelay = 30000; // 30 seconds max backoff

  const clearPendingTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearPendingTimeout();
    setStatus("connecting");
    const ws = new WebSocket(url, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      retryCountRef.current = 0;
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
      // Schedule reconnection with exponential backoff
      const delay = Math.min(1000 * 2 ** retryCountRef.current, maxDelay);
      retryCountRef.current += 1;
      timeoutRef.current = window.setTimeout(() => {
        connect();
      }, delay);
    };
  }, [url, protocols, onMessage, onOpen, onClose, onError]);

  const send = useCallback((data: string | ArrayBuffer | Blob) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  const disconnect = useCallback(() => {
    clearPendingTimeout();
    wsRef.current?.close();
    wsRef.current = null;
    setStatus("disconnected");
  }, []);

  // Initialise connection on mount and clean up on unmount
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, send, reconnect: connect, disconnect };
};