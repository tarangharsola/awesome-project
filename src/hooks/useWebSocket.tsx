import { useEffect, useRef, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

type MessageHandler = (msg: WebSocketMessage) => void;

export default function useWebSocket(
  url: string,
  onMessage: MessageHandler,
  reconnectAttempts = 5
) {
  const wsRef = useRef<WebSocket | null>(null);
  const attemptsRef = useRef(0);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      attemptsRef.current = 0;
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
      if (attemptsRef.current < reconnectAttempts) {
        attemptsRef.current += 1;
        const timeout = Math.min(1000 * attemptsRef.current, 10000);
        setTimeout(connect, timeout);
      }
    };
  }, [url, onMessage, reconnectAttempts]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback(
    (msg: WebSocketMessage) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(msg));
      }
    },
    []
  );

  return { sendMessage };
}