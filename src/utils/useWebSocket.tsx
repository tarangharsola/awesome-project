import { useEffect, useRef, useCallback } from 'react';
import useReconnection from './useReconnection';
import type { MessageHandler, WebSocketOptions } from '../types';

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It exposes a sendMessage function and forwards incoming messages to the provided handler.
 */
export default function useWebSocket(url: string, onMessage: MessageHandler, options?: WebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const { maxAttempts = 10, baseDelay = 500 } = options || {};
  const { attempt, scheduleReconnect, resetAttempts } = useReconnection({ maxAttempts, baseDelay });

  const sendMessage = useCallback((data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const connect = () => {
      if (!isMounted) return;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        resetAttempts();
        // Notify server of new connection if needed
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          onMessage(payload);
        } catch (e) {
          console.error('Invalid WebSocket message', e);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error', err);
      };

      ws.onclose = () => {
        wsRef.current = null;
        if (isMounted) {
          scheduleReconnect(connect);
        }
      };
    };

    connect();
    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, onMessage, maxAttempts, baseDelay]);

  return { sendMessage, connectionAttempts: attempt };
}
