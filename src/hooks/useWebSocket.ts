import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { useReconnection } from './useReconnection';

export const useWebSocket = (url: string, onMessage: (msg: WebSocketMessage) => void) => {
  const wsRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<WebSocketMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const { scheduleReconnect, cancelReconnect } = useReconnection(() => connect());

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      messageQueue.current.push(msg);
    }
  }, []);

  const flushQueue = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      messageQueue.current.forEach(m => wsRef.current?.send(JSON.stringify(m)));
      messageQueue.current = [];
    }
  };

  const connect = () => {
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      cancelReconnect();
      flushQueue();
    };
    wsRef.current.onmessage = event => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      scheduleReconnect();
    };
    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      cancelReconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { sendMessage, connected };
};