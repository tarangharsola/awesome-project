import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage, WebSocketStatus } from '../types/websocketMessage';

/**
 * Hook to manage a WebSocket connection.
 * Returns connection status, the most recent parsed message, and a send function.
 */
export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => setStatus('connected');
    ws.onclose = () => setStatus('disconnected');
    ws.onerror = () => setStatus('error');
    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setLastMessage(data);
      } catch {
        // Silently ignore malformed messages
      }
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { status, lastMessage, sendMessage };
}
