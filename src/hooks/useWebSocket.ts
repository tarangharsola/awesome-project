import { useEffect, useRef, useState, useCallback } from 'react';

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

type WebSocketMessage = any; // adjust as needed

interface UseWebSocketReturn {
  socket: WebSocket | null;
  status: ConnectionStatus;
  sendMessage: (msg: WebSocketMessage) => void;
}

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 * @param url The WebSocket endpoint URL.
 */
export function useWebSocket(url: string): UseWebSocketReturn {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const socketRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef<number>(1000); // start with 1s
  const maxBackoff = 30000; // 30s

  const clearSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.onopen = null;
      socketRef.current.onclose = null;
      socketRef.current.onerror = null;
      socketRef.current.onmessage = null;
      socketRef.current.close();
      socketRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      backoffRef.current = 1000; // reset backoff on success
    };

    ws.onclose = () => {
      setStatus('disconnected');
      // schedule reconnection with backoff
      const timeout = backoffRef.current;
      backoffRef.current = Math.min(backoffRef.current * 2, maxBackoff);
      setTimeout(() => {
        connect();
      }, timeout);
    };

    ws.onerror = () => {
      // Errors also trigger close which will handle reconnection
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket not open. Message not sent:', msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      clearSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { socket: socketRef.current, status, sendMessage };
}
