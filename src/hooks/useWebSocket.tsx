import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

interface UseWebSocketOptions {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
  /** Optional callback when the socket opens */
  onOpen?: () => void;
  /** Optional callback when the socket closes */
  onClose?: () => void;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection,
 * exponential back‑off and a send queue for messages generated while offline.
 */
export function useWebSocket({ url, onMessage, onOpen, onClose }: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const maxBackoff = 30000; // 30 seconds

  const flushQueue = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      while (messageQueue.current.length > 0) {
        const msg = messageQueue.current.shift();
        wsRef.current.send(JSON.stringify(msg));
      }
    }
  }, []);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // Queue the message until the socket is re‑established
      messageQueue.current.push(msg);
    }
  }, []);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      flushQueue();
      onOpen?.();
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Invalid WebSocket message', e);
      }
    };
    wsRef.current.onclose = () => {
      setIsConnected(false);
      onClose?.();
      // Attempt reconnection with exponential back‑off
      const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, maxBackoff);
      reconnectAttempts.current += 1;
      setTimeout(() => {
        connect();
      }, timeout);
    };
    wsRef.current.onerror = (err) => {
      console.error('WebSocket error', err);
      // Close will trigger reconnection logic
      wsRef.current?.close();
    };
  }, [url, flushQueue, onMessage, onOpen, onClose]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, isConnected };
}
