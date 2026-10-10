import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook for managing a WebSocket connection with exponential backoff reconnection.
 * Returns a sendMessage function and the current connection status.
 */
export function useWebSocket(url: string, onMessage: (msg: WebSocketMessage) => void) {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 10;

  const connect = useCallback(() => {
    // Determine if this is an initial connection or a reconnection attempt
    setStatus(retryCountRef.current === 0 ? 'connected' : 'reconnecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0; // reset on successful connection
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      attemptReconnect();
    };

    ws.onerror = () => {
      // Close will trigger onclose which starts reconnection
      ws.close();
    };
  }, [url, onMessage]);

  const attemptReconnect = () => {
    if (retryCountRef.current >= maxRetries) {
      console.warn('Maximum reconnection attempts reached');
      return;
    }
    const backoff = Math.min(1000 * 2 ** retryCountRef.current, 30000); // cap at 30s
    retryCountRef.current += 1;
    setTimeout(() => {
      connect();
    }, backoff);
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  }, []);

  return { sendMessage, status } as const;
}
