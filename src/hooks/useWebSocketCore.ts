import { useEffect, useRef, useState } from 'react';

export interface WSOptions {
  url: string;
  reconnectInterval?: number;
}

export interface WSMessage {
  type: string;
  payload: any;
}

export const useWebSocketCore = ({ url, reconnectInterval = 2000 }: WSOptions) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);

  const sendMessage = (msg: WSMessage) => {
    wsRef.current?.send(JSON.stringify(msg));
  };

  useEffect(() => {
    let shouldReconnect = true;
    const connect = () => {
      wsRef.current = new WebSocket(url);
      wsRef.current.onopen = () => setConnected(true);
      wsRef.current.onclose = () => {
        setConnected(false);
        if (shouldReconnect) {
          setTimeout(connect, reconnectInterval);
        }
      };
      wsRef.current.onerror = () => wsRef.current?.close();
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
        } catch {
          // ignore malformed messages
        }
      };
    };
    connect();
    return () => {
      shouldReconnect = false;
      wsRef.current?.close();
    };
  }, [url, reconnectInterval]);

  return { connected, lastMessage, sendMessage };
};
