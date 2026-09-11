import { useEffect, useRef, useState } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

export interface WebSocketHook {
  send: (msg: WebSocketMessage) => void;
  lastMessage: WebSocketMessage | null;
  readyState: number;
}

export const useWebSocket = (url: string): WebSocketHook => {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setReadyState(ws.readyState);

    ws.onopen = () => setReadyState(ws.readyState);
    ws.onclose = () => setReadyState(ws.readyState);
    ws.onerror = () => setReadyState(ws.readyState);
    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setLastMessage(data);
      } catch {
        // ignore malformed messages
      }
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const send = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { send, lastMessage, readyState };
};