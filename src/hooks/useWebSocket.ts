import { useEffect, useRef, useState, useCallback } from 'react';
import useReconnection from './useReconnection';
import type { WebSocketMessage } from '../types/websocketMessage';

export default function useWebSocket(url: string) {
  const [status, setStatus] = useState<'connecting'|'open'|'closed'>('connecting');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<WebSocketMessage[]>([]);
  const { scheduleReconnect, reset } = useReconnection(() => connect());

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      setStatus('open');
      reset();
      while (messageQueue.current.length) {
        ws.send(JSON.stringify(messageQueue.current.shift()));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;
        setLastMessage(data);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setStatus('closed');
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, scheduleReconnect, reset]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (status === 'open' && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      messageQueue.current.push(msg);
    }
  }, [status]);

  return { status, lastMessage, sendMessage };
}
