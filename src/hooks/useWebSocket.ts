import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook that manages a WebSocket connection with automatic reconnection,
 * exponential back‑off, and outbound message queuing while disconnected.
 *
 * @param url The WebSocket endpoint URL.
 * @param onMessage Callback invoked for each incoming message.
 * @param onOpen Optional callback invoked when the socket successfully opens.
 */
export function useWebSocket(
  url: string,
  onMessage: (msg: WebSocketMessage) => void,
  onOpen?: () => void
) {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<number | null>(null);

  const MAX_RECONNECT_DELAY = 30000; // 30 seconds
  const BASE_RECONNECT_DELAY = 1000; // 1 second

  const clearReconnectTimer = () => {
    if (reconnectTimeout.current !== null) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
  };

  const scheduleReconnect = useCallback(() => {
    clearReconnectTimer();
    const delay = Math.min(
      BASE_RECONNECT_DELAY * 2 ** reconnectAttempts.current,
      MAX_RECONNECT_DELAY
    );
    reconnectTimeout.current = window.setTimeout(() => {
      reconnectAttempts.current += 1;
      initializeWebSocket();
    }, delay);
  }, []);

  const flushQueue = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      while (messageQueue.current.length > 0) {
        const msg = messageQueue.current.shift();
        if (msg) {
          wsRef.current.send(JSON.stringify(msg));
        }
      }
    }
  }, []);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // Queue the message until the socket is re‑established.
      messageQueue.current.push(msg);
    }
  }, []);

  const handleOpen = useCallback(() => {
    setConnectionStatus('connected');
    reconnectAttempts.current = 0;
    clearReconnectTimer();
    flushQueue();
    if (onOpen) onOpen();
  }, [flushQueue, onOpen]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    },
    [onMessage]
  );

  const handleClose = useCallback(() => {
    setConnectionStatus('disconnected');
    wsRef.current = null;
    scheduleReconnect();
  }, [scheduleReconnect]);

  const handleError = useCallback((event: Event) => {
    console.error('WebSocket error', event);
    // Errors typically lead to close events; no extra handling needed.
  }, []);

  const initializeWebSocket = useCallback(() => {
    setConnectionStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.addEventListener('open', handleOpen);
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('close', handleClose);
    ws.addEventListener('error', handleError);
  }, [url, handleOpen, handleMessage, handleClose, handleError]);

  // Initialise on mount and clean up on unmount.
  useEffect(() => {
    initializeWebSocket();
    return () => {
      clearReconnectTimer();
      if (wsRef.current) {
        wsRef.current.removeEventListener('open', handleOpen);
        wsRef.current.removeEventListener('message', handleMessage);
        wsRef.current.removeEventListener('close', handleClose);
        wsRef.current.removeEventListener('error', handleError);
        wsRef.current.close();
      }
    };
    // eslint‑disable-next-line react-hooks/exhaustive-deps (intentional static deps)
  }, []);

  return { sendMessage, connectionStatus } as const;
}
