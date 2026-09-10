// src/hooks/useReconnection.ts
import { useEffect, useState, useRef } from 'react';
import WSClient from '../utils/websocketClient';
import type { WebSocketMessage } from '../types/websocketMessage';

export function useReconnection(url: string, onMessage: (msg: WebSocketMessage) => void) {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<WSClient | null>(null);

  useEffect(() => {
    const client = new WSClient({
      url,
      onMessage,
      onOpen: () => setConnected(true),
      onClose: () => setConnected(false),
    });
    clientRef.current = client;
    return () => {
      client.close();
    };
  }, [url, onMessage]);

  const send = (msg: any) => {
    clientRef.current?.send(msg);
  };

  return { connected, send };
}
