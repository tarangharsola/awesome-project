import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../../types';

type Status = 'connected' | 'disconnected' | 'connecting';

/**
 * Hook that manages a WebSocket connection with automatic reconnection using
 * exponential backoff. It exposes the connection status, a countdown for the
 * next retry attempt, and a sendMessage function.
 */
export const useWebSocket = (
  url: string = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<Status>('connecting');
  const [retryIn, setRetryIn] = useState<number | null>(null);

  // Backoff starts at 1s and caps at 30s.
  const backoffRef = useRef<number>(1000);
  const maxBackoff = 30000;
  const reconnectTimeout = useRef<number | null>(null);

  const connect = useCallback(() => {
    setStatus('connecting');
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setStatus('connected');
      setRetryIn(null);
      backoffRef.current = 1000; // reset backoff after successful connection
    };

    wsRef.current.onmessage = (event) => {
      // Forward messages via a global custom event so other parts of the app can listen.
      const data: WebSocketMessage = JSON.parse(event.data);
      window.dispatchEvent(new CustomEvent('ws-message', { detail: data }));
    };

    wsRef.current.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    wsRef.current.onerror = () => {
      // Treat any error as a closed connection to trigger reconnection.
      wsRef.current?.close();
    };
  }, [url]);

  const scheduleReconnect = useCallback(() => {
    const delay = backoffRef.current;
    setRetryIn(Math.ceil(delay / 1000));
    reconnectTimeout.current = window.setTimeout(() => {
      setRetryIn(null);
      connect();
    }, delay);
    backoffRef.current = Math.min(backoffRef.current * 2, maxBackoff);
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  // Initialise connection on mount.
  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      wsRef.current?.close();
    };
  }, [connect]);

  // Countdown UI for retryIn.
  useEffect(() => {
    if (retryIn === null) return;
    const interval = setInterval(() => {
      setRetryIn((prev) => {
        if (prev && prev > 1) return prev - 1;
        clearInterval(interval);
        return null;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [retryIn]);

  return { status, retryIn, sendMessage };
};