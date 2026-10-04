import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export function useWebSocket(url: string, onMessage: (msg: WebSocketMessage) => void) {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const messageQueue = useRef<WebSocketMessage[]>([]);
  const reconnectAttempts = useRef(0);
  const maxBackoff = 30000; // 30 seconds max delay

  const connect = useCallback(() => {
    setStatus('connecting');
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
      // Flush any queued messages
      while (messageQueue.current.length > 0) {
        const msg = messageQueue.current.shift();
        wsRef.current?.send(JSON.stringify(msg));
      }
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
      setStatus('disconnected');
      scheduleReconnect();
    };

    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  }, [url, onMessage]);

  const scheduleReconnect = useCallback(() => {
    const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, maxBackoff);
    reconnectAttempts.current += 1;
    setTimeout(() => {
      connect();
    }, timeout);
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (status === 'connected' && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      // Queue the message to be sent after reconnection
      messageQueue.current.push(msg);
    }
  }, [status]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, status } as const;
}
