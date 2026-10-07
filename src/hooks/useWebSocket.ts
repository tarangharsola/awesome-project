import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { ConnectionStatus } from '../types/connectionStatus';
import { WS_URL } from '../utils/websocketClient';

export interface UseWebSocketReturn {
  status: ConnectionStatus;
  sendMessage: (msg: WebSocketMessage) => void;
  lastMessage: WebSocketMessage | null;
}

/**
 * Hook to manage a WebSocket connection with automatic reconnection.
 * Provides connection status, a send function, and the most recent message.
 */
export function useWebSocket(roomId: string, userId: string): UseWebSocketReturn {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);

  const connect = () => {
    const ws = new WebSocket(`${WS_URL}?room=${roomId}&user=${userId}`);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => setStatus('connected');
    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };
    ws.onerror = () => ws.close();

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setLastMessage(data);
      } catch {
        // Silently ignore malformed messages
      }
    };
  };

  const scheduleReconnect = () => {
    if (reconnectTimeout.current !== null) return;
    reconnectTimeout.current = window.setTimeout(() => {
      reconnectTimeout.current = null;
      connect();
    }, 2000);
  };

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeout.current !== null) {
        clearTimeout(reconnectTimeout.current);
      }
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, userId]);

  return { status, sendMessage, lastMessage };
}
