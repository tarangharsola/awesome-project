import { useEffect, useState, useCallback } from 'react';
import wsClient from '../utils/websocketClient';
import { WebSocketMessage } from '../types/websocketMessage';

export const useWebSocket = (onMessage: (msg: WebSocketMessage) => void) => {
  const [connected, setConnected] = useState(wsClient.readyState === WebSocket.OPEN);

  const handleMessage = useCallback(
    (msg: WebSocketMessage) => {
      onMessage(msg);
    },
    [onMessage]
  );

  useEffect(() => {
    const updateStatus = () => setConnected(wsClient.readyState === WebSocket.OPEN);
    const interval = setInterval(updateStatus, 500);
    wsClient.addMessageHandler(handleMessage);
    return () => {
      clearInterval(interval);
      wsClient.removeMessageHandler(handleMessage);
    };
  }, [handleMessage]);

  const send = useCallback((msg: WebSocketMessage) => {
    wsClient.send(msg);
  }, []);

  return { connected, send };
};
