import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export const useConnectionStatus = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    setStatus('connecting');
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };
    wsRef.current.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url]);

  const scheduleReconnect = () => {
    const baseDelay = 1000; // 1 second
    const maxDelay = 30000; // 30 seconds
    const delay = Math.min(baseDelay * 2 ** retryCountRef.current, maxDelay);
    retryCountRef.current += 1;
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  const retry = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    retryCountRef.current = 0;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return { status, sendMessage, retry };
};