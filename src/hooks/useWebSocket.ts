import { useEffect, useRef, useState, useCallback } from "react";

type Message = any;
type Status = "connected" | "connecting" | "disconnected";

export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<Status>("connecting");
  const pendingRef = useRef<Message[]>([]);
  const reconnectAttemptsRef = useRef(0);
  const maxDelay = 30000;

  const sendMessage = useCallback((msg: Message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      pendingRef.current.push(msg);
    }
  }, []);

  const flushPending = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      pendingRef.current.forEach((msg) => wsRef.current?.send(JSON.stringify(msg)));
      pendingRef.current = [];
    }
  }, []);

  const connect = useCallback(() => {
    setStatus("connecting");
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setStatus("connected");
      reconnectAttemptsRef.current = 0;
      flushPending();
    };

    wsRef.current.onclose = () => {
      setStatus("disconnected");
      const attempt = ++reconnectAttemptsRef.current;
      const delay = Math.min(1000 * 2 ** attempt, maxDelay);
      setTimeout(connect, delay);
    };

    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, flushPending]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const addMessageListener = useCallback((handler: (msg: any) => void) => {
    const listener = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        handler(data);
      } catch {
        // ignore malformed messages
      }
    };
    wsRef.current?.addEventListener("message", listener);
    return () => wsRef.current?.removeEventListener("message", listener);
  }, []);

  return { sendMessage, addMessageListener, status };
}
