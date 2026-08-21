import { useEffect, useRef, useState } from 'react';
import { WebSocketClient } from './websocketClient';

export interface WSMessage {
  type: string;
  payload: any;
}

export interface UseWebSocketReturn {
  client: WebSocketClient | null;
  connected: boolean;
  send: (type: string, payload: any) => void;
  onMessage: (type: string, handler: (msg: WSMessage) => void) => void;
}

export function useWebSocket(url: string): UseWebSocketReturn {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<WebSocketClient | null>(null);

  useEffect(() => {
    const client = new WebSocketClient(url);
    clientRef.current = client;

    const handleOpen = () => setConnected(true);
    const handleClose = () => setConnected(false);

    client.on('open', handleOpen);
    client.on('close', handleClose);

    return () => {
      client.off('open', handleOpen);
      client.off('close', handleClose);
      client.close();
    };
  }, [url]);

  const send = (type: string, payload: any) => {
    clientRef.current?.send(type, payload);
  };

  const onMessage = (type: string, handler: (msg: WSMessage) => void) => {
    clientRef.current?.on(type, handler);
  };

  return { client: clientRef.current, connected, send, onMessage };
}
