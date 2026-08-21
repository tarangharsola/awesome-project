import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  payload?: any;
}

interface UseWebSocketReturn {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (msg: WebSocketMessage) => void;
}

/**
 * Hook to manage a WebSocket connection with automatic reconnection.
 * @param url The WebSocket endpoint URL.
 * @param reconnectIntervalMs Interval between reconnection attempts (ms).
 */
export function useWebSocket(
  url: string,
  reconnectIntervalMs: number = 3000
): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current !== null) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    clearReconnectTimeout();
    const ws = new WebSocket(url);
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => {
      setIsConnected(false);
      // Attempt reconnection after a delay
      reconnectTimeoutRef.current = window.setTimeout(() => connect(), reconnectIntervalMs);
    };
    ws.onerror = () => ws.close();
    socketRef.current = ws;
  }, [url, reconnectIntervalMs]);

  useEffect(() => {
    connect();
    return () => {
      clearReconnectTimeout();
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
  };
}
