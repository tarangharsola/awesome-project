{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.onopen = () => {
      setConnectionStatus('Connected');
    };

    ws.onclose = () => {
      setConnectionStatus('Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  const reconnect = () => {
    ws.close();
    setWs(new WebSocket('ws://localhost:8080'));
  };

  return { reconnect, connectionStatus };
};

export default useWebSocket;