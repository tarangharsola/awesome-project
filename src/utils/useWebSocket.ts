{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
  }, []);

  const send = (message) => {
    if (ws) {
      ws.send(message);
    }
  };

  const receive = (callback) => {
    if (ws) {
      ws.onmessage = (event) => {
        callback(JSON.parse(event.data));
      };
    }
  };

  return { send, receive };
};

export default useWebSocket;