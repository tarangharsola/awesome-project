{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => ws.close();
  }, []);

  return { send: (message) => ws.send(JSON.stringify(message)), receive: (event, callback) => ws.onmessage = (event) => callback(JSON.parse(event.data)) };
};

export default useWebSocket;