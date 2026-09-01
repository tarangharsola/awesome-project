import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

/**
 * Hook that manages a WebSocket connection with automatic reconnection using exponential backoff.
 * Returns the active WebSocket instance (or null while disconnected) and the current connection status.
 */
export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const backoffRef = useRef<number>(0);
  const attemptRef = useRef<number>(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = () => {
    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setStatus('connected');
      setSocket(ws);
      // Reset backoff on successful connection
      backoffRef.current = 0;
      attemptRef.current = 0;
    };

    ws.onmessage = (event: MessageEvent) => {
      // Forward raw messages to any listeners via a custom event.
      const customEvent = new CustomEvent<WebSocketMessage>('ws-message', { detail: JSON.parse(event.data) });
      window.dispatchEvent(customEvent);
    };

    ws.onerror = () => {
      // Errors will also trigger onclose; no special handling needed here.
    };

    ws.onclose = () => {
      setStatus('disconnected');
      setSocket(null);
      scheduleReconnect();
    };
  };

  const scheduleReconnect = () => {
    clearReconnectTimeout();
    // Exponential backoff: start at 1s, double each attempt, max 30s.
    const baseDelay = 1000; // 1 second
    const maxDelay = 30000; // 30 seconds
    const attempt = attemptRef.current + 1;
    attemptRef.current = attempt;
    const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
    backoffRef.current = delay;
    setStatus('reconnecting');
    reconnectTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      if (socket) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Helper to send messages safely.
  const sendMessage = (msg: WebSocketMessage) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  };

  return { socket, status, sendMessage };
}
