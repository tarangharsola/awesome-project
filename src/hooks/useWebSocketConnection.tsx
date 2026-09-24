import { useEffect, useRef, useState, useCallback } from 'react';

interface UseWebSocketConnectionProps {
  url: string;
  onMessage: (msg: any) => void;
}

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

export const useWebSocketConnection = ({ url, onMessage }: UseWebSocketConnectionProps) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCountRef = useRef(0);
  const maxDelay = 30000; // 30 seconds maximum backoff

  const connect = useCallback(() => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCountRef.current = 0;
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [url, onMessage]);

  const scheduleReconnect = useCallback(() => {
    const retry = retryCountRef.current + 1;
    retryCountRef.current = retry;
    const delay = Math.min(1000 * 2 ** retry, maxDelay);
    setTimeout(() => {
      connect();
    }, delay);
  }, [connect]);

  const sendMessage = useCallback((msg: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, sendMessage } as const;
};
