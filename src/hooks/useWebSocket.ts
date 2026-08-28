import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It exposes the socket instance, a sendMessage helper and the current
 * connection status ("connected" | "disconnected").
 */
export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setStatus('connected');
      attemptsRef.current = 0; // reset backoff on successful connection
    };

    ws.onclose = () => {
      setStatus('disconnected');
      // Exponential backoff with a max delay of 10 seconds
      const delay = Math.min(10000, 1000 * 2 ** attemptsRef.current);
      attemptsRef.current += 1;
      timeoutRef.current = window.setTimeout(() => {
        connect();
      }, delay);
    };

    ws.onerror = () => {
      // Errors are handled by closing the socket which triggers reconnection
      ws.close();
    };

    setSocket(ws);
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (socket) socket.close();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps – we want to run only once on mount
  }, []);

  const sendMessage = useCallback(
    (msg: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(msg);
      }
    },
    [socket]
  );

  return { socket, sendMessage, status };
};