import { useEffect, useRef, useState, useCallback } from 'react';

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

interface UseWebSocketOptions {
  /** URL of the WebSocket endpoint */
  url: string;
  /** Callback invoked for each incoming message */
  onMessage: (msg: any) => void;
  /** Optional function to generate a sync request after reconnection */
  getSyncMessage?: () => any;
}

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 * It guarantees that pending messages are sent once the connection is re‑established
 * and provides a clear connection status for UI components.
 */
export function useWebSocket({ url, onMessage, getSyncMessage }: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const pendingMessages = useRef<any[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');

  const backoffDelay = (attempt: number) => Math.min(1000 * 2 ** attempt, 30000);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    setStatus('reconnecting');

    wsRef.current.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
      // Flush pending messages
      pendingMessages.current.forEach((msg) => wsRef.current?.send(JSON.stringify(msg)));
      pendingMessages.current = [];
      // Request latest document state after a reconnect if needed
      if (getSyncMessage) {
        wsRef.current?.send(JSON.stringify(getSyncMessage()));
      }
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    wsRef.current.onclose = () => {
      setStatus('disconnected');
      // Schedule reconnection
      const attempt = ++reconnectAttempts.current;
      const delay = backoffDelay(attempt);
      setTimeout(connect, delay);
    };

    wsRef.current.onerror = (err) => {
      console.error('WebSocket error', err);
      wsRef.current?.close();
    };
  }, [url, onMessage, getSyncMessage]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: any) => {
    const payload = JSON.stringify(msg);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(payload);
    } else {
      // Queue message for later transmission
      pendingMessages.current.push(msg);
    }
  }, []);

  return { sendMessage, status, reconnectAttempts: reconnectAttempts.current };
}
