import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook for managing a WebSocket connection with automatic reconnection using exponential backoff.
 * Returns received messages, a sendMessage function, current connection status, and a manual retry function.
 */
export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [retryCount, setRetryCount] = useState(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      setRetryCount(0);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        setMessages(prev => [...prev, data]);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onerror = () => {
      setStatus('error');
    };

    ws.onclose = () => {
      setStatus('disconnected');
      // Schedule reconnection with exponential backoff
      const delay = Math.min(1000 * 2 ** retryCount, maxDelay);
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        connect();
      }, delay);
      // Cleanup timer if component unmounts before reconnection
      return () => clearTimeout(timer);
    };
  }, [url, retryCount]);

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
    }
  }, []);

  const retry = useCallback(() => {
    wsRef.current?.close();
    setRetryCount(0);
    connect();
  }, [connect]);

  return { messages, sendMessage, status, retry };
};