import { useEffect, useRef, useState } from 'react';

type MessageHandler = (msg: any) => void;

/**
 * Hook that manages a WebSocket connection with automatic reconnection,
 * exponential back‑off, and a send queue for messages generated while offline.
 */
export function useWebSocket(url: string, onMessage: MessageHandler) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const messageQueue = useRef<any[]>([]);
  const reconnectAttempts = useRef(0);
  const maxAttempts = 10;

  const connect = () => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
      // Flush any queued messages
      while (messageQueue.current.length) {
        const msg = messageQueue.current.shift();
        wsRef.current?.send(JSON.stringify(msg));
      }
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    wsRef.current.onclose = () => {
      setConnected(false);
      attemptReconnect();
    };

    wsRef.current.onerror = () => {
      // Force close to trigger reconnection logic
      wsRef.current?.close();
    };
  };

  const attemptReconnect = () => {
    if (reconnectAttempts.current >= maxAttempts) {
      console.warn('Maximum reconnection attempts reached');
      return;
    }
    const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
    reconnectAttempts.current += 1;
    setTimeout(() => {
      connect();
    }, timeout);
  };

  const send = (msg: any) => {
    const payload = JSON.stringify(msg);
    if (connected && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(payload);
    } else {
      // Queue the message until the socket is ready again
      messageQueue.current.push(msg);
    }
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // Re‑connect only when the URL changes
  }, [url]);

  return { send, connected } as const;
}
