import { useEffect, useRef, useState, useCallback } from "react";

type MessageHandler = (msg: any) => void;

export function useWebSocket(url: string, onMessage: MessageHandler) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const messageQueue = useRef<any[]>([]);

  const maxDelay = 30000; // 30 seconds max backoff

  const scheduleReconnect = useCallback(() => {
    const delay = Math.min(1000 * 2 ** reconnectAttempts.current, maxDelay);
    reconnectAttempts.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
      // Flush any queued messages
      while (messageQueue.current.length > 0) {
        const msg = messageQueue.current.shift();
        wsRef.current?.send(JSON.stringify(msg));
      }
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      scheduleReconnect();
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, onMessage, scheduleReconnect]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback(
    (msg: any) => {
      if (isConnected && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(msg));
      } else {
        messageQueue.current.push(msg);
      }
    },
    [isConnected]
  );

  return { sendMessage, isConnected };
}
