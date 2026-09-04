import { useEffect, useRef, useState, useCallback } from "react";

type Message = any;

type UseWebSocketOptions = {
  onMessage: (msg: Message) => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export type WebSocketStatus = "connected" | "disconnected" | "reconnecting";

export const useWebSocket = (url: string, options: UseWebSocketOptions) => {
  const { onMessage, onOpen, onClose } = options;
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const wsRef = useRef<WebSocket | null>(null);
  const pendingRef = useRef<Message[]>([]);
  const reconnectAttemptsRef = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const flushQueue = useCallback(() => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      while (pendingRef.current.length) {
        const msg = pendingRef.current.shift();
        ws.send(JSON.stringify(msg));
      }
    }
  }, []);

  const sendMessage = useCallback((msg: Message) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    } else {
      pendingRef.current.push(msg);
    }
  }, []);

  const connect = useCallback(() => {
    setStatus("reconnecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      reconnectAttemptsRef.current = 0;
      flushQueue();
      onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      onClose?.();
      // schedule reconnection with exponential backoff
      const attempts = ++reconnectAttemptsRef.current;
      const delay = Math.min(1000 * 2 ** attempts, maxDelay);
      setTimeout(connect, delay);
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, flushQueue, onMessage, onOpen, onClose]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { sendMessage, status };
};