import { useEffect, useRef, useState } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';

interface UseWebSocketReturn {
  socket: WebSocket | null;
  sendMessage: (msg: WebSocketMessage) => void;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection and
 * message queuing. It exposes the current socket, a sendMessage function that
 * safely queues messages when the socket is not open, and a connection status.
 */
export function useWebSocket(url: string): UseWebSocketReturn {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  const socketRef = useRef<WebSocket | null>(null);
  const messageQueueRef = useRef<WebSocketMessage[]>([]);
  const reconnectAttemptsRef = useRef(0);
  const maxBackoff = 30000; // 30 seconds

  const flushQueue = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      while (messageQueueRef.current.length > 0) {
        const msg = messageQueueRef.current.shift();
        if (msg) {
          socketRef.current.send(JSON.stringify(msg));
        }
      }
    }
  };

  const connect = () => {
    setConnectionStatus('connecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('connected');
      reconnectAttemptsRef.current = 0;
      flushQueue();
    };

    ws.onmessage = (event) => {
      // Consumers will attach their own listeners via the returned socket.
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      // Attempt reconnection with exponential backoff.
      const attempts = ++reconnectAttemptsRef.current;
      const backoff = Math.min(1000 * 2 ** attempts, maxBackoff);
      setTimeout(connect, backoff);
    };

    ws.onerror = () => {
      // Errors also trigger close which will start reconnection.
      ws.close();
    };
  };

  useEffect(() => {
    connect();
    // Cleanup on unmount.
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = (msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      // Queue the message to be sent once the socket reconnects.
      messageQueueRef.current.push(msg);
    }
  };

  return {
    socket: socketRef.current,
    sendMessage,
    connectionStatus,
  };
}
