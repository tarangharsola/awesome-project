import { useEffect, useRef, useState } from 'react';

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

export interface WebSocketHook {
  sendMessage: (msg: unknown) => void;
  status: ConnectionStatus;
  ws: WebSocket | null;
}

/**
 * useWebSocket - establishes a WebSocket connection with automatic reconnection using exponential backoff.
 * @param url The WebSocket endpoint URL.
 * @returns An object containing a sendMessage function, current connection status, and the underlying WebSocket instance.
 */
export function useWebSocket(url: string): WebSocketHook {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const connect = () => {
    setStatus('reconnecting');
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
      // Close the socket to trigger onclose and reconnection flow
      ws.close();
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

  return { sendMessage, status, ws: wsRef.current };
}
