import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

/**
 * Hook to manage a WebSocket connection with automatic reconnection and exponential backoff.
 * Returns a sendMessage function and the current connection status.
 */
export const useWebSocket = (url: string, onMessage: (msg: WebSocketMessage) => void) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const maxRetryDelay = 30000; // 30 seconds maximum backoff

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0; // reset backoff on successful connection
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    const scheduleReconnect = () => {
      const retryDelay = Math.min(1000 * 2 ** retryCountRef.current, maxRetryDelay);
      retryCountRef.current += 1;
      setTimeout(() => {
        connect();
      }, retryDelay);
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Close will trigger onclose which handles reconnection
      ws.close();
    };
  }, [url, onMessage]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket not open. Message not sent:', msg);
    }
  }, []);

  return { sendMessage, status };
};