{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  return ws;
};

export default useWebSocket;