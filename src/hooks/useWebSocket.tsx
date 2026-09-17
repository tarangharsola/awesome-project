import { useEffect, useRef, useState, useCallback } from "react";

type Message = any; // Replace with concrete message type as needed

type ConnectionStatus = "connected" | "connecting" | "disconnected";

/**
 * Hook that manages a resilient WebSocket connection.
 * - Automatic exponential back‑off reconnection.
 * - Queues outbound messages while disconnected.
 * - Emits incoming messages via a global CustomEvent ("ws-message").
 */
export function useWebSocket(url: string) {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const socketRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<Message[]>([]);
  const reconnectAttempts = useRef(0);
  const maxBackoff = 30000; // 30 seconds max delay

  const connect = useCallback(() => {
    setStatus("connecting");
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      reconnectAttempts.current = 0;
      // Flush any queued messages
      while (messageQueue.current.length > 0) {
        const msg = messageQueue.current.shift();
        ws.send(JSON.stringify(msg));
      }
    };

    ws.onmessage = (event) => {
      const custom = new CustomEvent("ws-message", { detail: event.data });
      window.dispatchEvent(custom);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url]);

  const scheduleReconnect = useCallback(() => {
    const attempts = reconnectAttempts.current + 1;
    reconnectAttempts.current = attempts;
    const backoff = Math.min(1000 * 2 ** attempts, maxBackoff);
    setTimeout(() => {
      connect();
    }, backoff);
  }, [connect]);

  const sendMessage = useCallback((msg: Message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      // Queue for later transmission
      messageQueue.current.push(msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, sendMessage } as const;
}
