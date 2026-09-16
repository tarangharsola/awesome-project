import { useEffect, useRef, useState, useCallback } from 'react';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

interface UseWebSocketReturn {
  socket: WebSocket | null;
  sendMessage: (msg: unknown) => void;
  status: ConnectionStatus;
}

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 * It provides the current socket instance, a sendMessage helper, and the connection status.
 */
export function useWebSocket(url: string): UseWebSocketReturn {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const retryCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const baseDelay = 1000; // 1 second
  const maxDelay = 30000; // 30 seconds

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    clearReconnectTimeout();
    const delay = Math.min(baseDelay * 2 ** retryCountRef.current, maxDelay);
    reconnectTimeoutRef.current = window.setTimeout(() => {
      retryCountRef.current += 1;
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors also lead to close event; ensure socket is closed.
      ws.close();
    };

    setSocket(ws);
  }, [url, scheduleReconnect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      socket?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: unknown) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  }, [socket]);

  return { socket, sendMessage, status };
}
