import { useEffect, useRef, useState } from 'react';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

interface UseWebSocketResult {
  sendMessage: (msg: unknown) => void;
  status: ConnectionStatus;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection using
 * exponential backoff. It exposes a sendMessage function and the current
 * connection status.
 */
export const useWebSocket = (url: string): UseWebSocketResult => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = () => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      // Close will trigger onclose which schedules reconnection
      ws.close();
    };

    ws.onmessage = (event) => {
      // Consumers can attach their own listeners via the returned wsRef if needed.
      // This hook purposefully does not handle incoming messages to stay generic.
    };
  };

  const scheduleReconnect = () => {
    const delay = Math.min(1000 * 2 ** retryCountRef.current, maxDelay);
    retryCountRef.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = (msg: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { sendMessage, status };
};
