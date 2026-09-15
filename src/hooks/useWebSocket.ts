import { useEffect, useRef, useState } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * Returns the latest message received and a send function.
 */
export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<WebSocketMessage | null>(null);
  const [connected, setConnected] = useState(false);

  // Send a JSON‑serializable payload
  const send = (payload: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  useEffect(() => {
    let reconnectTimeout: number;
    const connect = () => {
      wsRef.current = new WebSocket(url);
      wsRef.current.onopen = () => setConnected(true);
      wsRef.current.onclose = () => {
        setConnected(false);
        // Attempt reconnection after a short delay
        reconnectTimeout = window.setTimeout(connect, 2000);
      };
      wsRef.current.onerror = () => wsRef.current?.close();
      wsRef.current.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          setMessage(data);
        } catch {
          // ignore malformed messages
        }
      };
    };
    connect();
    return () => {
      clearTimeout(reconnectTimeout);
      wsRef.current?.close();
    };
  }, [url]);

  return { message, send, connected } as const;
}
