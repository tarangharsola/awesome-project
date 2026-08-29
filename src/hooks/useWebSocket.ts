import { useEffect, useRef, useState, useCallback } from "react";

type WSStatus = "connected" | "connecting" | "disconnected" | "error";

interface UseWebSocketReturn {
  socket: WebSocket | null;
  status: WSStatus;
  sendMessage: (msg: string) => void;
  manualReconnect: () => void;
}

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 * @param url WebSocket endpoint.
 * @param maxRetries Maximum number of reconnection attempts (Infinity for unlimited).
 */
export function useWebSocket(
  url: string,
  maxRetries: number = Infinity
): UseWebSocketReturn {
  const [status, setStatus] = useState<WSStatus>("connecting");
  const socketRef = useRef<WebSocket | null>(null);
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
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      retryCountRef.current = 0;
    };

    ws.onmessage = (event) => {
      // Consumers can attach listeners to socketRef.current?.onmessage if needed.
    };

    ws.onerror = () => {
      setStatus("error");
    };

    ws.onclose = () => {
      setStatus("disconnected");
      if (retryCountRef.current < maxRetries) {
        const delay = Math.min(1000 * 2 ** retryCountRef.current, 30000);
        retryCountRef.current += 1;
        backoffTimeoutRef.current = window.setTimeout(() => {
          connect();
        }, delay);
      }
    };
  }, [url, maxRetries]);

  const manualReconnect = useCallback(() => {
    clearBackoff();
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }
    connect();
  }, [connect]);

  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.warn("WebSocket is not open. Message not sent:", msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      clearBackoff();
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    socket: socketRef.current,
    status,
    sendMessage,
    manualReconnect,
  };
}
