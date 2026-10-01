import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'retrying';

type UseWebSocketOptions = {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
};

export const useWebSocket = ({ url, onMessage }: UseWebSocketOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const reconnectAttempts = useRef(0);
  const maxDelay = 30000; // 30 seconds max backoff

  const scheduleReconnect = useCallback(() => {
    reconnectAttempts.current += 1;
    const delay = Math.min(1000 * 2 ** reconnectAttempts.current, maxDelay);
    setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus(reconnectAttempts.current === 0 ? 'connecting' : 'retrying');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, onMessage, scheduleReconnect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket is not open. Message not sent:', msg);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sendMessage, status };
};

export default useWebSocket;
