import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const reconnectAttempts = useRef(0);
  const maxAttempts = 5;

  useEffect(() => {
    let ws: WebSocket;
    const connect = () => {
      ws = new WebSocket(url);
      ws.onopen = () => {
        setConnected(true);
        reconnectAttempts.current = 0;
      };
      ws.onclose = () => {
        setConnected(false);
        if (reconnectAttempts.current < maxAttempts) {
          reconnectAttempts.current += 1;
          setTimeout(connect, 1000 * reconnectAttempts.current);
        }
      };
      ws.onerror = () => ws.close();
      setSocket(ws);
    };
    connect();
    return () => {
      ws?.close();
    };
  }, [url]);

  const sendMessage = (msg: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg));
    }
  };

  return { socket, connected, sendMessage };
}
