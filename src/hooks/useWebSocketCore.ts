import { useEffect, useRef, useState, useCallback } from "react";
import { WebSocketMessage } from "../types/websocketMessage";

export interface WebSocketOptions {
  url: string;
  protocols?: string | string[];
  maxRetries?: number;
  backoffBase?: number; // ms
}

export const useWebSocketCore = ({
  url,
  protocols,
  maxRetries = 5,
  backoffBase = 1000,
}: WebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const pendingRef = useRef<WebSocketMessage[]>([]);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url, protocols);
    wsRef.current.onopen = () => {
      setConnected(true);
      retryCountRef.current = 0;
      // flush pending messages
      pendingRef.current.forEach((msg) => wsRef.current?.send(JSON.stringify(msg)));
      pendingRef.current = [];
    };
    wsRef.current.onmessage = (event) => {
      if (onMessageRef.current) {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          onMessageRef.current(data);
        } catch {
          // ignore malformed messages
        }
      }
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      if (retryCountRef.current < maxRetries) {
        const timeout = backoffBase * 2 ** retryCountRef.current;
        retryCountRef.current += 1;
        setTimeout(connect, timeout);
      }
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, protocols, maxRetries, backoffBase]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const onMessageRef = useRef<(msg: WebSocketMessage) => void>();
  const setOnMessage = (handler: (msg: WebSocketMessage) => void) => {
    onMessageRef.current = handler;
  };

  const sendMessage = (msg: WebSocketMessage) => {
    if (connected && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // queue until connection is re-established
      pendingRef.current.push(msg);
    }
  };

  return { connected, sendMessage, setOnMessage };
};