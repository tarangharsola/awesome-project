import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage, WebSocketStatus } from '../types';

export interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  reconnectInterval?: number;
}

export interface UseWebSocketReturn {
  status: WebSocketStatus;
  sendMessage: (msg: WebSocketMessage) => void;
  latestMessage: WebSocketMessage | null;
}

export function useWebSocket({ url, protocols, reconnectInterval = 3000 }: UseWebSocketOptions): UseWebSocketReturn {
  const [status, setStatus] = useState<WebSocketStatus>('DISCONNECTED');
  const [latestMessage, setLatestMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<number | null>(null);

  const cleanup = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (reconnectTimeout !== null) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };

  const connect = () => {
    setStatus('CONNECTING');
    wsRef.current = new WebSocket(url, protocols);
    wsRef.current.onopen = () => setStatus('CONNECTED');
    wsRef.current.onclose = () => {
      setStatus('DISCONNECTED');
      reconnectTimeout = setTimeout(connect, reconnectInterval) as unknown as number;
    };
    wsRef.current.onerror = () => wsRef.current?.close();
    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setLatestMessage(data);
      } catch {
        // ignore malformed messages
      }
    };
  };

  useEffect(() => {
    connect();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(protocols)]);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { status, sendMessage, latestMessage };
}
