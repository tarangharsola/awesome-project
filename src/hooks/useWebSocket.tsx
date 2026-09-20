import { useEffect, useRef, useState } from 'react';
import { WebSocketClient } from '../utils/websocketClient';
import { WebSocketMessage } from '../types/websocketMessage';

type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

export const useWebSocket = (url: string) => {
  const clientRef = useRef<WebSocketClient | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');

  useEffect(() => {
    const client = new WebSocketClient(url);
    clientRef.current = client;

    const handleStatus = (s: ConnectionStatus) => setStatus(s);
    client.addStatusHandler(handleStatus);

    return () => {
      client.removeStatusHandler(handleStatus);
      client.close();
    };
  }, [url]);

  const sendMessage = (msg: WebSocketMessage) => {
    clientRef.current?.send(msg);
  };

  const addMessageListener = (handler: (msg: WebSocketMessage) => void) => {
    clientRef.current?.addMessageHandler(handler);
    return () => clientRef.current?.removeMessageHandler(handler);
  };

  return { status, sendMessage, addMessageListener };
};
