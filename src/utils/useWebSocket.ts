{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(new WebSocket('ws://localhost:8080'));

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        console.log(data.users);
      } else if (data.type === 'code') {
        console.log(data.code);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return ws;
};

export default useWebSocket;