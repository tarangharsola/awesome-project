{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useWebSocket() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => ws.close();
  }, []);

  return ws;
}

export default useWebSocket;