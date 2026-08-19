import { useCallback, useEffect, useRef, useState } from 'react';

type WSStatus = 'connected' | 'connecting' | 'disconnected' | 'reconnecting';

/**
 * Hook to manage a WebSocket connection with automatic reconnection and exponential back‑off.
 * Returns the current connection status, the number of reconnection attempts, a sendMessage
 * helper, and a manual reconnect trigger.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<WSStatus>('connecting');
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const backoffRef = useRef<number>(1000); // start with 1s

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      setReconnectAttempts(0);
      backoffRef.current = 1000; // reset back‑off on successful connection
    };

    ws.onclose = () => {
      // If the component is unmounting, onclose will fire – we still want to attempt reconnect.
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Errors are followed by onclose, so we just close the socket to trigger the reconnection flow.
      ws.close();
    };
  }, [url]);

  const scheduleReconnect = useCallback(() => {
    setStatus('reconnecting');
    const delay = backoffRef.current;
    setTimeout(() => {
      setReconnectAttempts((a) => a + 1);
      connect();
    }, delay);
    // Double the delay for the next attempt, capping at 30s.
    backoffRef.current = Math.min(backoffRef.current * 2, 30000);
  }, [connect]);

  const sendMessage = useCallback((msg: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  }, []);

  const reconnect = useCallback(() => {
    // Manual trigger – reset back‑off and start a fresh connection.
    if (wsRef.current) {
      wsRef.current.close();
    }
    backoffRef.current = 1000;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, reconnectAttempts, sendMessage, reconnect };
};

export default useWebSocket;
