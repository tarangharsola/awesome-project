import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

type MessageHandler = (msg: WebSocketMessage) => void;

export function useWebSocket(url: string, onMessage: MessageHandler) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxAttempts = 5;

  const connect = () => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
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
      if (reconnectAttempts.current < maxAttempts) {
        const timeout = Math.pow(2, reconnectAttempts.current) * 1000;
        setTimeout(connect, timeout);
        reconnectAttempts.current += 1;
      }
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // Reconnect only when URL changes
  }, [url]);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { sendMessage, connected } as const;
}
