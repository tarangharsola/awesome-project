{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    return () => {
      ws.close();
    };
  }, []);

  const send = (data) => {
    if (ws) {
      ws.send(JSON.stringify(data));
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