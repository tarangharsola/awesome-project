{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  userId: string;
}

const useWebSocket = (userId: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursor') {
        setCursor({ id: userId, position: data.data.position });
      } else if (data.type === 'users') {
        setUsers(data.data.users);
      }
    };
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
    };
    return () => ws.close();
  }, [userId]);

  const send = (data: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  };

  return { send, connected };
}

export default useWebSocket;