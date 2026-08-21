import { useEffect, useRef, useState } from 'react';

interface WSOptions {
  url: string;
  protocols?: string | string[];
  reconnectAttempts?: number;
  reconnectDelay?: number; // initial delay in ms
}

export const useWebSocket = ({ url, protocols, reconnectAttempts = 5, reconnectDelay = 1000 }: WSOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const connect = () => {
    wsRef.current = new WebSocket(url, protocols);
    wsRef.current.onopen = () => {
      setConnected(true);
      attemptsRef.current = 0;
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      if (attemptsRef.current < reconnectAttempts) {
        const delay = reconnectDelay * Math.pow(2, attemptsRef.current); // exponential backoff
        attemptsRef.current += 1;
        timeoutRef.current = window.setTimeout(() => {
          connect();
        }, delay);
      }
    };
    wsRef.current.onerror = (err) => {
      console.error('WebSocket error:', err);
      wsRef.current?.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = (msg: any) => {
    if (connected && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket not connected, message dropped:', msg);
    }
  };

  return { connected, sendMessage, ws: wsRef.current };
};