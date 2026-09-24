import { useEffect, useRef, useState, useCallback } from "react";
import type { WebSocketMessage } from "../types/websocketMessage";

interface Options {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
  onOpen?: () => void;
  onClose?: () => void;
  reconnectAttempts?: number;
  reconnectDelay?: number; // base ms for exponential backoff
}

export function useWebSocketConnection({
  url,
  onMessage,
  onOpen,
  onClose,
  reconnectAttempts = Infinity,
  reconnectDelay = 1000,
}: Options) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const pendingRef = useRef<WebSocketMessage[]>([]);
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const send = useCallback((msg: WebSocketMessage) => {
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
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      attemptsRef.current = 0;
      setConnected(true);
      onOpen?.();
      flushPending();
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      onClose?.();
      if (attemptsRef.current < reconnectAttempts) {
        const delay = reconnectDelay * Math.pow(2, attemptsRef.current);
        attemptsRef.current += 1;
        timeoutRef.current = window.setTimeout(connect, delay);
      }
    };
    wsRef.current.onerror = () => {
      // Trigger reconnection via onclose
      wsRef.current?.close();
    };
  }, [url, onMessage, onOpen, onClose, reconnectAttempts, reconnectDelay, flushPending]);

  useEffect(() => {
    connect();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return { send, connected };
}
