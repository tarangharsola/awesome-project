import { useEffect, useRef, useState } from 'react';
import { createWebSocket, WebSocketMessage, WebSocketStatus } from '../utils/websocketClient';
import { User } from '../types';

export interface UseWebSocketResult {
  status: WebSocketStatus;
  sendMessage: (msg: WebSocketMessage) => void;
  lastMessage: WebSocketMessage | null;
}

/**
 * Hook that manages a WebSocket connection for a collaborative room.
 * It provides connection status, a send function, and the most recent message.
 */
export function useWebSocket(roomId: string, user: User): UseWebSocketResult {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = createWebSocket(roomId, user);
    wsRef.current = ws;

    const handleOpen = () => setStatus('connected');
    const handleClose = () => setStatus('disconnected');
    const handleError = () => setStatus('error');
    const handleMessage = (ev: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(ev.data);
        setLastMessage(data);
      } catch {
        // Silently ignore malformed messages
      }
    };

    ws.addEventListener('open', handleOpen);
    ws.addEventListener('close', handleClose);
    ws.addEventListener('error', handleError);
    ws.addEventListener('message', handleMessage);

    return () => {
      ws.removeEventListener('open', handleOpen);
      ws.removeEventListener('close', handleClose);
      ws.removeEventListener('error', handleError);
      ws.removeEventListener('message', handleMessage);
      ws.close();
    };
  }, [roomId, user]);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { status, sendMessage, lastMessage };
}
