import { useEffect, useRef, useState, useCallback } from 'react';
import { ConnectionStatus } from '../types/connectionStatus';
import { WebSocketMessage } from '../types/websocketMessage';

export interface UseWebSocketOptions {
  url: string;
  reconnectInterval?: number;
}

export const useWebSocket = ({
  url,
  reconnectInterval = 3000,
}: UseWebSocketOptions) => {
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.Disconnected);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const cleanup = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    setStatus(ConnectionStatus.Reconnecting);
    const ws = new WebSocket(url);
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setStatus(ConnectionStatus.Connected);
    };

    ws.onclose = () => {
      setStatus(ConnectionStatus.Disconnected);
      reconnectTimeoutRef.current = window.setTimeout(() => {
        connect();
      }, reconnectInterval);
    };

    ws.onerror = () => {
      ws.close();
    };

    socketRef.current = ws;
  }, [url, reconnectInterval]);

  useEffect(() => {
    connect();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    }
  }, []);

  const addMessageListener = useCallback(
    (listener: (msg: WebSocketMessage) => void) => {
      const ws = socketRef.current;
      if (!ws) return;
      const handler = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage;
          listener(data);
        } catch {
          // ignore malformed messages
        }
      };
      ws.addEventListener('message', handler);
      return () => ws.removeEventListener('message', handler);
    },
    []
  );

  return {
    status,
    sendMessage,
    addMessageListener,
  };
};
