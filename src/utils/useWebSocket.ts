{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useWebSocket(url) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };
    return () => {
      socket.close();
    };
  }, []);

  return ws;
}

export default useWebSocket;