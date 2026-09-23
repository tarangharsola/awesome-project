import { useEffect, useRef, useState } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook that manages a WebSocket connection with automatic reconnection and
 * exponential back‑off. It also queues outbound messages while the socket is
 * disconnected and flushes them once the connection is re‑established.
 */
export function useWebSocketConnection(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const pendingMessages = useRef<WebSocketMessage[]>([]);
  const [connected, setConnected] = useState(false);

  const maxBackoff = 30000; // 30 seconds

  const scheduleReconnect = () => {
    const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, maxBackoff);
    reconnectAttempts.current += 1;
    setTimeout(() => connect(), timeout);
  };

  const flushQueue = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      pendingMessages.current.forEach((msg) => socketRef.current?.send(JSON.stringify(msg)));
      pendingMessages.current = [];
    }
  };

  const sendMessage = (msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      pendingMessages.current.push(msg);
    }
  };

  const connect = () => {
    socketRef.current = new WebSocket(url);
    socketRef.current.onopen = () => {
      setConnected(true);
      reconnectAttempts.current = 0;
      // Request latest document state to recover from possible divergence.
      sendMessage({ type: 'SYNC_REQUEST' });
      flushQueue();
    };
    socketRef.current.onmessage = (event) => {
      // Consumers will attach their own listeners via the returned socket.
      // This hook only manages connection state.
    };
    socketRef.current.onclose = () => {
      setConnected(false);
      scheduleReconnect();
    };
    socketRef.current.onerror = () => {
      // Force close to trigger reconnection logic.
      socketRef.current?.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { socket: socketRef.current, connected, sendMessage } as const;
}
