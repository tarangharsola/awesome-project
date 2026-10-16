import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook to manage a WebSocket connection with exponential backoff reconnection.
 *
 * @param url - The WebSocket endpoint URL.
 * @param onMessage - Callback invoked for each incoming message.
 * @returns An object containing the sendMessage function, current connection status, and a manual reconnect trigger.
 */
export function useWebSocket(
  url: string,
  onMessage: (msg: WebSocketMessage) => void
) {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const backoffRef = useRef({ attempt: 0, delay: 1000 }); // start at 1s

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearReconnectTimeout();
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      // Reset backoff on successful connection
      backoffRef.current = { attempt: 0, delay: 1000 };
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
      setStatus('error');
    };

    ws.onclose = () => {
      setStatus('disconnected');
      // Schedule reconnection with exponential backoff
      const { attempt, delay } = backoffRef.current;
      const nextDelay = Math.min(delay * 2, 30000); // cap at 30s
      backoffRef.current = { attempt: attempt + 1, delay: nextDelay };
      reconnectTimeoutRef.current = window.setTimeout(() => {
        connect();
      }, delay);
    };
  }, [url, onMessage]);

  // Initial connection
  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback(
    (msg: WebSocketMessage) => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(msg));
      } else {
        console.warn('Attempted to send message while WebSocket is not open');
      }
    },
    []
  );

  const manualReconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    // Reset backoff and attempt immediate reconnection
    backoffRef.current = { attempt: 0, delay: 1000 };
    connect();
  }, [connect]);

  return { sendMessage, status, manualReconnect };
}
