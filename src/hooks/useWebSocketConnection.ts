import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

/**
 * Low‑level WebSocket connection hook.
 * Manages socket lifecycle, connection state, incoming messages and provides a send helper.
 */
export const useWebSocketConnection = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
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

  return { connected, lastMessage, sendMessage };
};