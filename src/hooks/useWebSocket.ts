import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

interface UseWebSocketOptions {
  url: string;
  /** Called with parsed JSON messages from the server */
  onMessage: (msg: WebSocketMessage) => void;
  /** Optional initial payload to send after connection */
  initPayload?: any;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It queues outgoing messages while disconnected and flushes them once the
 * connection is re‑established. Reconnection uses exponential back‑off with a
 * configurable maximum delay.
 */
export function useWebSocket({ url, onMessage, initPayload }: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const pendingMessages = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds

  const flushQueue = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      while (pendingMessages.current.length) {
        const msg = pendingMessages.current.shift();
        socketRef.current.send(JSON.stringify(msg));
      }
    }
  }, []);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      pendingMessages.current.push(msg);
    }
  }, []);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      // Send any init payload first
      if (initPayload) {
        ws.send(JSON.stringify(initPayload));
      }
      flushQueue();
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      // Attempt reconnection with exponential back‑off
      const attempt = ++reconnectAttempts.current;
      const delay = Math.min(1000 * 2 ** attempt, maxDelay);
      setTimeout(connect, delay);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
      ws.close();
    };
  }, [url, initPayload, onMessage, flushQueue]);

  useEffect(() => {
    connect();
    // Cleanup on unmount
    return () => {
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep connection alive – simple ping every 30 seconds
  useEffect(() => {
    if (!isConnected) return undefined;
    const interval = setInterval(() => {
      sendMessage({ type: 'ping', timestamp: Date.now() });
    }, 30000);
    return () => clearInterval(interval);
  }, [isConnected, sendMessage]);

  return { isConnected, sendMessage, socket: socketRef.current };
}
