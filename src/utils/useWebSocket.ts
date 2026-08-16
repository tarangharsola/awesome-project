import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = (roomId: string) => {
  const [ws, setWs] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);
    setWs(ws);
    return () => ws.close();
  }, []);
  return ws;
};

export default useWebSocket;