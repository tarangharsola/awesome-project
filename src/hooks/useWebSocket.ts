import { useEffect, useRef, useState, useCallback } from 'react';
import type { WebSocketMessage } from '../types/websocketMessage';
import type { ConnectionStatus } from '../types/connection';

/**
 * Hook to manage a WebSocket connection.
 * Returns a sendMessage function and the current connection status.
 */
export const useWebSocket = (
  url: string,
  onMessage: (msg: WebSocketMessage) => void
): {
  sendMessage: (msg: WebSocketMessage) => void;
  connectionStatus: ConnectionStatus;
} => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const socketRef = useRef<WebSocket | null>(null);

  const sendMessage = useCallback(
    (msg: WebSocketMessage) => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(msg));
      }
    },
    []
  );

  useEffect(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;
    setConnectionStatus('connecting');

    ws.onopen = () => setConnectionStatus('connected');
    ws.onclose = () => setConnectionStatus('disconnected');
    ws.onerror = () => setConnectionStatus('error');

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch {
        // Silently ignore malformed messages
      }
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage]);

  return { sendMessage, connectionStatus };
};
