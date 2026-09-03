import { useEffect, useRef, useState, useCallback } from 'react';

type Message = any;

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

/**
 * useWebSocket – Hook that manages a WebSocket connection with automatic
 * reconnection using exponential backoff. It exposes the current connection
 * status, a sendMessage function, and the underlying WebSocket instance.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef<number>(1000); // start at 1 second
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleReconnect = useCallback(() => {
    if (timeoutRef.current) return; // already scheduled
    const delay = backoffRef.current;
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      connect();
      // Double the delay for next attempt, capping at 30 seconds
      backoffRef.current = Math.min(backoffRef.current * 2, 30000);
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      backoffRef.current = 1000; // reset backoff on successful connection
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors also lead to a close event; ensure we close to trigger reconnection
      ws.close();
    };

    // Consumers can attach their own onmessage handlers via the returned ws instance
    // or by using a separate hook that reads wsRef.current.
  }, [url, scheduleReconnect]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: Message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return { status, sendMessage, ws: wsRef.current } as const;
};