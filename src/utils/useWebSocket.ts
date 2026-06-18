{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

function useWebSocket(url) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    ws.onmessage = (event) => {
      // Handle incoming messages
    };
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (ws) {
      ws.send(message);
    }
  };

  return [ws, sendMessage];
}

export default useWebSocket;