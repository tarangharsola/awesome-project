import { useEffect, useRef, useState, useCallback } from "react";

type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const maxDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setStatus("connected");
      reconnectAttemptsRef.current = 0;
      // Flush any queued messages
      messageQueue.forEach((msg) => wsRef.current?.send(msg));
      setMessageQueue([]);
    };

    wsRef.current.onmessage = (event) => {
      // Consumers can attach their own listeners via the returned ws reference.
    };

    wsRef.current.onclose = () => {
      setStatus("disconnected");
      scheduleReconnect();
    };

    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, messageQueue]);

  const scheduleReconnect = () => {
    if (reconnectTimeoutRef.current !== null) return;
    setStatus("reconnecting");
    const attempts = reconnectAttemptsRef.current;
    const delay = Math.min(1000 * 2 ** attempts, maxDelay);
    reconnectAttemptsRef.current = attempts + 1;
    reconnectTimeoutRef.current = window.setTimeout(() => {
      reconnectTimeoutRef.current = null;
      connect();
    }, delay);
  };

  const sendMessage = (msg: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    } else {
      setMessageQueue((prev) => [...prev, msg]);
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, [connect]);

  return { sendMessage, status, ws: wsRef.current };
};