import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { ConnectionStatus } from '../types/connectionStatus';

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It buffers outgoing messages while the connection is down and flushes them
 * once the socket is re‑established.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const pendingMessages = useRef<WebSocketMessage[]>([]);

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
      // Flush any messages that were queued while offline
      pendingMessages.current.forEach((msg) => ws.send(JSON.stringify(msg)));
      pendingMessages.current = [];
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const custom = new CustomEvent('websocket-message', { detail: data });
        window.dispatchEvent(custom);
      } catch (e) {
        console.error('Failed to parse websocket message', e);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      // Exponential back‑off with a max of 10 seconds
      const timeout = Math.min(10000, 1000 * 2 ** reconnectAttempts.current);
      reconnectAttempts.current += 1;
      setTimeout(connect, timeout);
    };

    ws.onerror = () => {
      // Close the socket to trigger the reconnection logic in onclose
      ws.close();
    };

    socketRef.current = ws;
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (status === 'connected' && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      // Queue the message for later transmission
      pendingMessages.current.push(msg);
    }
  }, [status]);

  return { status, sendMessage } as const;
};