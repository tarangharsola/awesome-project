{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

function useWebSocket(url) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    return () => ws.close();
  }, []);

  return ws;
}

export default useWebSocket;