import { useEffect, useRef, useCallback } from 'react';
import { WebSocketMessage, User, CursorData } from '../../types';

export const useWebSocket = (
  url: string,
  onMessage: (msg: WebSocketMessage) => void,
  onOpen?: () => void,
  onClose?: () => void
) => {
  const wsRef = useRef<WebSocket | null>(null);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Invalid WS message', e);
      }
    };

    ws.onclose = () => {
      onClose?.();
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage, onOpen, onClose]);

  return { sendMessage };
};