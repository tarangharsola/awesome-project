import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage, ConnectionStatus } from '../types';
import { createWebSocketClient } from '../utils/websocketClient';

export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const pendingMessages = useRef<WebSocketMessage[]>([]);

  const sendMessage = (msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      pendingMessages.current.push(msg);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const connect = () => {
      const ws = createWebSocketClient(url);
      wsRef.current = ws;
      setStatus('connecting');

      ws.onopen = () => {
        if (!isMounted) return;
        setStatus('connected');
        pendingMessages.current.forEach((m) => ws.send(JSON.stringify(m)));
        pendingMessages.current = [];
      };

      ws.onclose = () => {
        if (!isMounted) return;
        setStatus('disconnected');
        setTimeout(connect, 2000);
      };

      ws.onerror = () => {
        if (!isMounted) return;
        setStatus('error');
        ws.close();
      };
    };

    connect();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, [url]);

  return { ws: wsRef.current, status, sendMessage };
};