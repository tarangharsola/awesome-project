import { useEffect, useRef, useState } from "react";
import type { WebSocketMessage } from "../types/websocketMessage";

export type WebSocketStatus = "connected" | "disconnected" | "connecting";

export const useWebSocket = (url: string, onMessage: (msg: WebSocketMessage) => void) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const messageQueue = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const maxBackoff = 30000; // 30 seconds

  const connect = () => {
    setStatus("connecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      reconnectAttempts.current = 0;
      // Flush queued messages
      while (messageQueue.current.length > 0) {
        const msg = messageQueue.current.shift()!;
        ws.send(JSON.stringify(msg));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  };

  const scheduleReconnect = () => {
    const attempts = ++reconnectAttempts.current;
    const backoff = Math.min(1000 * 2 ** attempts, maxBackoff);
    setTimeout(() => {
      connect();
    }, backoff);
  };

  const send = (msg: WebSocketMessage) => {
    if (status === "connected" && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // Queue for later transmission
      messageQueue.current.push(msg);
    }
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { status, send };
};