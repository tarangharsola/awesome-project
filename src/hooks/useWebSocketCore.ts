import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { ConnectionStatus } from '../types/connectionStatus';

type UseWebSocketCoreProps = {
  url: string;
  onMessage: (msg: WebSocketMessage) => void;
};

type UseWebSocketCoreReturn = {
  status: ConnectionStatus;
  sendMessage: (msg: WebSocketMessage) => void;
  nextDelay?: number;
};

export const useWebSocketCore = ({ url, onMessage }: UseWebSocketCoreProps): UseWebSocketCoreReturn => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [nextDelay, setNextDelay] = useState<number | undefined>(undefined);
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const maxDelay = 30000; // 30 seconds max backoff

  const computeDelay = (retry: number) => Math.min(1000 * 2 ** (retry - 1), maxDelay);

  const scheduleReconnect = useCallback(() => {
    const retry = retryCountRef.current + 1;
    retryCountRef.current = retry;
    const delay = computeDelay(retry);
    setNextDelay(delay);
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const connect = useCallback(() => {
    setStatus('connecting');
    setNextDelay(undefined);
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
      setNextDelay(undefined);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;
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
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, sendMessage, nextDelay };
};