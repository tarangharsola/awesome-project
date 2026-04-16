{"import { useState, useEffect } from 'react';
import { WebSocket } from './WebSocket';

function useWebSocket() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
  }, []);

  return { ws };
}

export default useWebSocket;