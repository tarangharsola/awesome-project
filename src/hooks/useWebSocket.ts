import { useEffect, useRef, useState, useCallback } from "react";

export type WebSocketStatus = "connected" | "connecting" | "disconnected";

export interface UseWebSocketOptions {
  url: string;
  onMessage?: (event: MessageEvent) => void;
  reconnectInterval?: number;
}

/**
 * Hook to manage a WebSocket connection with automatic reconnection.
 */
export function useWebSocket({ url, onMessage, reconnectInterval = 3000 }: UseWebSocketOptions) {
  const [status, setStatus] = useState<WebSocketStatus>("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    setStatus("connecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setStatus("connected");
    ws.onclose = () => {
      setStatus("disconnected");
      // attempt reconnection
      reconnectTimeout.current = window.setTimeout(connect, reconnectInterval);
    };
    ws.onerror = () => ws.close();

    if (onMessage) {
      ws.onmessage = onMessage;
    }
  }, [url, onMessage, reconnectInterval]);

  useEffect(() => {
    connect();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  const send = useCallback((data: string | ArrayBuffer | Blob) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    } else {
      console.warn("WebSocket is not open. Unable to send message.");
    }
  }, []);

  return { status, send };
}
