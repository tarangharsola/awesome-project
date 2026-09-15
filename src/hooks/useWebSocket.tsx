import { useEffect, useRef, useState, useCallback } from "react";
import type { WebSocketMessage } from "../types/websocketMessage";

type UseWebSocketProps = {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
};

export const useWebSocket = ({ url, onMessage }: UseWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const pendingRef = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.binaryType = "arraybuffer";

    wsRef.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
      // Flush any messages that were queued while offline
      pendingRef.current.forEach((msg) => wsRef.current?.send(JSON.stringify(msg)));
      pendingRef.current = [];
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // Silently ignore malformed messages
      }
    };

    wsRef.current.onclose = () => {
      setConnected(false);
      scheduleReconnect();
    };

    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, onMessage]);

  const scheduleReconnect = useCallback(() => {
    const delay = Math.min(1000 * 2 ** reconnectAttempts.current, maxDelay);
    reconnectAttempts.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (connected && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      pendingRef.current.push(msg);
    }
  }, [connected]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return { connected, sendMessage };
};