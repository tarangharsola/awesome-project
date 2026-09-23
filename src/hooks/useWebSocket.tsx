import { useEffect, useRef, useState, useCallback } from 'react';

// Hook that manages a WebSocket connection with exponential back‑off reconnection.
// It exposes the socket instance, a sendMessage helper, and the current connection status.

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

export const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const retryCountRef = useRef(0);
  const maxDelay = 30000; // 30 seconds max back‑off

  const clearSocket = () => {
    if (socketRef.current) {
      socketRef.current.onopen = null;
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.onmessage = null;
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearSocket();
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('connected');
      retryCountRef.current = 0; // reset back‑off on successful connection
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors are handled by the close event; just ensure the socket is closed.
      ws.close();
    };

    // Consumers can attach their own onmessage handler via the returned socket.
  }, [url]);

  const scheduleReconnect = () => {
    setConnectionStatus('reconnecting');
    const attempt = retryCountRef.current;
    const delay = Math.min(1000 * Math.pow(2, attempt), maxDelay);
    retryCountRef.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  };

  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      clearSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  return {
    socket: socketRef.current,
    sendMessage,
    connectionStatus,
  } as const;
};
