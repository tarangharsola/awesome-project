import { useEffect, useRef, useState, useCallback } from 'react';
import { createWebSocketClient, WebSocketClient } from '../utils/websocketClient';
import { ConnectionStatus } from '../types/connectionStatus';

export const useWebSocket = () => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const wsRef = useRef<WebSocketClient | null>(null);
  const retryCountRef = useRef(0);
  const maxRetryDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    const client = createWebSocketClient({
      onOpen: () => {
        setStatus('connected');
        retryCountRef.current = 0;
      },
      onClose: () => {
        setStatus('disconnected');
        scheduleReconnect();
      },
      onError: () => {
        setStatus('disconnected');
        scheduleReconnect();
      },
    });
    wsRef.current = client;
  }, []);

  const scheduleReconnect = () => {
    const retry = retryCountRef.current + 1;
    retryCountRef.current = retry;
    const delay = Math.min(1000 * 2 ** retry, maxRetryDelay);
    setTimeout(() => {
      setStatus('connecting');
      connect();
    }, delay);
  };

  const reconnect = () => {
    wsRef.current?.close();
    retryCountRef.current = 0;
    setStatus('connecting');
    connect();
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return { status, reconnect, ws: wsRef.current };
};