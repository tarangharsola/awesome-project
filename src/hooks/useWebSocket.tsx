import { useEffect } from 'react';
import { useWebSocketConnection } from './useWebSocketConnection';
import { useReconnection } from '../utils/useReconnection';
import { WebSocketMessage } from '../types/websocketMessage';

/**
 * High‑level hook used throughout the app.
 * Wraps the low‑level connection hook and adds simple reconnection logic.
 */
export const useWebSocket = (url: string) => {
  const { connected, lastMessage, sendMessage } = useWebSocketConnection(url);
  const { attemptReconnect } = useReconnection();

  // Attempt reconnection after a short delay when disconnected
  useEffect(() => {
    if (!connected) {
      const timer = setTimeout(() => attemptReconnect(url), 3000);
      return () => clearTimeout(timer);
    }
  }, [connected, url, attemptReconnect]);

  return { connected, lastMessage, sendMessage } as {
    connected: boolean;
    lastMessage: WebSocketMessage | null;
    sendMessage: (msg: WebSocketMessage) => void;
  };
};