import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { connectWebSocket, sendMessage } from '../utils/websocketClient';

type UseWebSocketReturn = {
  connected: boolean;
  send: (msg: WebSocketMessage) => void;
};

export const useWebSocket = (
  url: string,
  onMessage: (msg: WebSocketMessage) => void
): UseWebSocketReturn => {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = connectWebSocket(url, {
      onOpen: () => setConnected(true),
      onClose: () => setConnected(false),
      onMessage: (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          onMessage(data);
        } catch {
          // Silently ignore malformed messages
        }
      },
    });
    wsRef.current = ws;
    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, onMessage]);

  const send = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      sendMessage(wsRef.current, msg);
    }
  };

  return { connected, send };
};