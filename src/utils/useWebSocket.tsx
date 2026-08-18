import { useEffect, useRef, useCallback } from "react";

type MessageHandler = (msg: any) => void;

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It provides a stable `sendMessage` function and guarantees that incoming
 * messages are parsed as JSON before being forwarded to the consumer.
 */
export function useWebSocket(
  url: string,
  onMessage: MessageHandler,
  onOpen?: () => void,
  onClose?: () => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxAttempts = 10;

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      reconnectAttempts.current = 0;
      onOpen?.();
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error("Invalid WebSocket message JSON", e);
      }
    };
    wsRef.current.onclose = () => {
      onClose?.();
      if (reconnectAttempts.current < maxAttempts) {
        const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
        setTimeout(() => {
          reconnectAttempts.current += 1;
          connect();
        }, timeout);
      } else {
        console.error("WebSocket reconnection attempts exhausted");
      }
    };
    wsRef.current.onerror = (e) => {
      console.error("WebSocket error", e);
      wsRef.current?.close();
    };
  }, [url, onMessage, onOpen, onClose]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((msg: any) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    } else {
      console.warn("WebSocket not open – message dropped", msg);
    }
  }, []);

  return { sendMessage };
}
