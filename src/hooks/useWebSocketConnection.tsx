import { useEffect, useRef, useCallback } from "react";
import { WebSocketMessage } from "../types/websocketMessage";

export interface WebSocketOptions {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (err: Event) => void;
}

export const useWebSocketConnection = ({
  url,
  onMessage,
  onOpen,
  onClose,
  onError,
}: WebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      onOpen?.();
    });
    ws.addEventListener("message", (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    });
    ws.addEventListener("close", () => {
      onClose?.();
    });
    ws.addEventListener("error", (e) => {
      onError?.(e);
    });

    return () => {
      ws.close();
    };
  }, [url, onMessage, onOpen, onClose, onError]);

  return { sendMessage };
};