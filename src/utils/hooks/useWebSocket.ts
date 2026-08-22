import { useState, useEffect, useRef, useCallback } from 'react';

type WSStatus = 'connected' | 'disconnected' | 'reconnecting';

interface UseWebSocketResult {
  socket: WebSocket | null;
  status: WSStatus;
  sendMessage: (msg: string) => void;
}

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 * It provides the current socket instance, connection status, and a safe sendMessage method.
 */
export function useWebSocket(url: string): UseWebSocketResult {
  const [status, setStatus] = useState<WSStatus>('disconnected');
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const timeoutIdRef = useRef<number | null>(null);

  const clearReconnectTimeout = () => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    clearReconnectTimeout();
    const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000); // cap at 30s
    reconnectAttempts.current += 1;
    timeoutIdRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('reconnecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Force close to trigger reconnection logic via onclose
      ws.close();
    };
  }, [url, scheduleReconnect]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  }, []);

  return {
    socket: socketRef.current,
    status,
    sendMessage,
  };
}
