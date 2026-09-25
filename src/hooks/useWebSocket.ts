import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

type UseWebSocketOptions = {
  onMessage: (msg: WebSocketMessage) => void;
  reconnectInterval?: number; // base ms for exponential backoff
  maxRetries?: number;
};

export const useWebSocket = (
  url: string,
  { onMessage, reconnectInterval = 1000, maxRetries = Infinity }: UseWebSocketOptions
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const retriesRef = useRef(0);
  const [connected, setConnected] = useState(false);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      retriesRef.current = 0;
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
      if (retriesRef.current < maxRetries) {
        const timeout = reconnectInterval * Math.pow(2, retriesRef.current);
        retriesRef.current += 1;
        setTimeout(connect, timeout);
      }
    };
    wsRef.current.onerror = () => {
      // Trigger close to start reconnection flow
      wsRef.current?.close();
    };
  }, [url, onMessage, reconnectInterval, maxRetries]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return { sendMessage, connected };
};