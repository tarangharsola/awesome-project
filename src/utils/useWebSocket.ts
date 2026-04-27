{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

function useWebSocket() {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => {
      ws.close();
    };
  }, []);

  return { ws, message };
}

export default useWebSocket;