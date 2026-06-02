{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    ws.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => ws.close();
  }, []);

  return [ws, message];
};

export default useWebSocket;