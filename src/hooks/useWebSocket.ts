import { useEffect, useRef, useState } from 'react';
import type { ConnectionStatus } from '../types/connectionStatus';

/**
 * Hook that manages a WebSocket connection with automatic reconnection and message queueing.
 * It exposes the current connection status, a send function, and the latest received message.
 */
export function useWebSocket(url: string, onMessage: (msg: any) => void) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const messageQueueRef = useRef<any[]>([]);

  const maxRetryDelay = 30000; // 30 seconds

  const connect = () => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
      // Flush queued messages
      while (messageQueueRef.current.length > 0) {
        const msg = messageQueueRef.current.shift();
        ws.send(JSON.stringify(msg));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
      ws.close();
    };
  };

  const scheduleReconnect = () => {
    const retry = retryCountRef.current + 1;
    retryCountRef.current = retry;
    const delay = Math.min(1000 * 2 ** retry, maxRetryDelay);
    setTimeout(() => {
      connect();
    }, delay);
  };

  const send = (msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // Queue the message until the socket is re‑established
      messageQueueRef.current.push(msg);
    }
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { status, send } as const;
}
