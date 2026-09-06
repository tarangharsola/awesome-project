import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook that manages a WebSocket connection with automatic reconnection,
 * exponential back‑off and outbound message queueing.
 *
 * It also exposes the current connection status and a sendMessage function.
 */
export function useWebSocket(url: string) {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const pendingMessagesRef = useRef<WebSocketMessage[]>([]);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const maxBackoff = 30000; // 30 seconds

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
      // Flush queued messages
      pendingMessagesRef.current.forEach(msg => ws.send(JSON.stringify(msg)));
      pendingMessagesRef.current = [];
    };

    ws.onmessage = (event) => {
      // Let consumers attach their own listeners via returned wsRef
      // No-op here – the hook consumer will read wsRef.current
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url]);

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current !== null) return; // already scheduled
    const backoff = Math.min(1000 * 2 ** retryCountRef.current, maxBackoff);
    reconnectTimeoutRef.current = window.setTimeout(() => {
      reconnectTimeoutRef.current = null;
      retryCountRef.current += 1;
      connect();
    }, backoff);
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // Queue until connection is re‑established
      pendingMessagesRef.current.push(msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeoutRef.current !== null) clearTimeout(reconnectTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ws: wsRef.current, status, sendMessage } as const;
}
