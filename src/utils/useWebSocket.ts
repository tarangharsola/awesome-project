{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      console.log(event.data);
    };
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
    };
    setWs(ws);
    return () => {
      ws.close();
    };
  }, []);

  return [ws, connected];
};

export default useWebSocket;