import { useEffect, useRef, useState, useCallback } from "react";
import { WebSocketMessage } from "../types/websocketMessage";
import { ConnectionStatus } from "../types/connectionStatus";

/**
 * Hook to manage a WebSocket connection with exponential backoff reconnection.
 * Returns the current connection status, a sendMessage function, and a manual reconnect trigger.
 */
export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [retryCount, setRetryCount] = useState(0);
  const maxRetryDelay = 30000; // 30 seconds max delay

  const connect = useCallback(() => {
    setStatus("connecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      setRetryCount(0);
    };

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        const customEvent = new CustomEvent("ws-message", { detail: message });
        window.dispatchEvent(customEvent);
      } catch (e) {
        console.error("Failed to parse WebSocket message", e);
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, scheduleReconnect]);

  const scheduleReconnect = useCallback(() => {
    const delay = Math.min(1000 * 2 ** retryCount, maxRetryDelay);
    setTimeout(() => {
      setRetryCount((c) => c + 1);
      connect();
    }, delay);
  }, [retryCount, connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("WebSocket not open – message dropped", msg);
    }
  }, []);

  const reconnect = useCallback(() => {
    setRetryCount(0);
    wsRef.current?.close();
    // connect will be called by onclose -> scheduleReconnect, but we want immediate retry
    connect();
  }, [connect]);

  const close = useCallback(() => {
    wsRef.current?.close();
  }, []);

  useEffect(() => {
    connect();
    return () => {
      close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, sendMessage, reconnect, close };
};