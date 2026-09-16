import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { createWebSocketClient } from '../utils/websocketClient';

/**
 * Hook to manage a WebSocket connection.
 * Provides connection status, received messages, and a send function.
 */
export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  useEffect(() => {
    const ws = createWebSocketClient(url);
    wsRef.current = ws;

    const handleOpen = () => setConnected(true);
    const handleClose = () => setConnected(false);
    const handleMessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setMessages(prev => [...prev, data]);
      } catch {
        // Silently ignore malformed messages
      }
    };

    ws.addEventListener('open', handleOpen);
    ws.addEventListener('close', handleClose);
    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('open', handleOpen);
      ws.removeEventListener('close', handleClose);
      ws.removeEventListener('message', handleMessage);
      ws.close();
    };
  }, [url]);

  const sendMessage = (msg: WebSocketMessage) => {
    wsRef.current?.send(JSON.stringify(msg));
  };

  return { connected, messages, sendMessage };
};