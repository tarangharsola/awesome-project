import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook to manage a WebSocket connection with automatic reconnection using exponential backoff.
 * Returns the sendMessage function and the current connection status.
 */
export const useWebSocket = (
  url: string,
  onMessage: (msg: WebSocketMessage) => void
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const MAX_RECONNECT_ATTEMPTS = 10;
  const BASE_DELAY_MS = 500; // initial delay
  const MAX_DELAY_MS = 30000; // cap delay at 30 seconds

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      setConnectionStatus('disconnected');
      return;
    }
    const delay = Math.min(BASE_DELAY_MS * 2 ** reconnectAttempts, MAX_DELAY_MS);
    setConnectionStatus('connecting');
    reconnectTimeoutRef.current = window.setTimeout(() => {
      setReconnectAttempts((prev) => prev + 1);
      initializeWebSocket();
    }, delay);
  }, [reconnectAttempts]);

  const initializeWebSocket = useCallback(() => {
    clearReconnectTimeout();
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setConnectionStatus('connected');
      setReconnectAttempts(0);
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    wsRef.current.onclose = () => {
      setConnectionStatus('disconnected');
      scheduleReconnect();
    };

    wsRef.current.onerror = (err) => {
      console.error('WebSocket error', err);
      wsRef.current?.close();
    };
  }, [url, onMessage, scheduleReconnect]);

  useEffect(() => {
    initializeWebSocket();
    return () => {
      clearReconnectTimeout();
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('Attempted to send message while WebSocket is not open');
    }
  }, []);

  return { sendMessage, connectionStatus };
};