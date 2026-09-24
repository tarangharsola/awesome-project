import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

export interface WebSocketConnection {
  send: (msg: WebSocketMessage) => void;
  isConnected: boolean;
  ws: WebSocket | null;
}

export const useWebSocketConnection = (url: string): WebSocketConnection => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    const handleOpen = () => setConnected(true);
    const handleClose = () => setConnected(false);
    const handleError = () => setConnected(false);

    ws.addEventListener('open', handleOpen);
    ws.addEventListener('close', handleClose);
    ws.addEventListener('error', handleError);

    return () => {
      ws.removeEventListener('open', handleOpen);
      ws.removeEventListener('close', handleClose);
      ws.removeEventListener('error', handleError);
      ws.close();
    };
  }, [url]);

  const send = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { send, isConnected, ws: wsRef.current };
};