import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

export interface UseWebSocketOptions {
  url: string;
  reconnectInterval?: number;
}

export interface WebSocketState {
  connected: boolean;
  lastMessage?: WebSocketMessage<any>;
}

export function useWebSocket<T = any>(options: UseWebSocketOptions) {
  const { url, reconnectInterval = 3000 } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const [state, setState] = useState<WebSocketState>({ connected: false });

  const sendMessage = useCallback((msg: WebSocketMessage<T>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const connect = () => {
      wsRef.current = new WebSocket(url);
      wsRef.current.onopen = () => {
        if (!isMounted) return;
        setState({ connected: true });
      };
      wsRef.current.onmessage = (event) => {
        if (!isMounted) return;
        try {
          const data: WebSocketMessage<any> = JSON.parse(event.data);
          setState((prev) => ({ ...prev, lastMessage: data }));
        } catch {
          // ignore malformed messages
        }
      };
      wsRef.current.onclose = () => {
        if (!isMounted) return;
        setState({ connected: false });
        setTimeout(connect, reconnectInterval);
      };
      wsRef.current.onerror = () => {
        wsRef.current?.close();
      };
    };
    connect();
    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, [url, reconnectInterval]);

  return { ...state, sendMessage };
}
