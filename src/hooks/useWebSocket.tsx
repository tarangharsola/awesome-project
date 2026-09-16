import { useEffect, useState, useCallback } from 'react';
import { initWebSocketClient, getWebSocketClient } from '../utils/websocketClient';
import type { WebSocketMessage } from '../types/websocketMessage';

export const useWebSocket = (url: string) => {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  // Initialize client once
  useEffect(() => {
    const client = initWebSocketClient(url);
    const handleOpen = () => setConnected(true);
    const handleClose = () => setConnected(false);
    const handleMessage = (data: string) => {
      try {
        const parsed: WebSocketMessage = JSON.parse(data);
        setLastMessage(parsed);
      } catch (e) {
        console.error('Invalid WebSocket message', e);
      }
    };
    client.on('open', handleOpen);
    client.on('close', handleClose);
    client.on('message', handleMessage);
    return () => {
      client.off('open', handleOpen);
      client.off('close', handleClose);
      client.off('message', handleMessage);
      client.close();
    };
  }, [url]);

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    const client = getWebSocketClient();
    if (!client) {
      console.error('WebSocket client not initialized');
      return;
    }
    client.send(JSON.stringify(msg));
  }, []);

  return { connected, lastMessage, sendMessage };
};
