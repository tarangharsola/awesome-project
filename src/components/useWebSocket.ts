{"import { useState, useEffect } from 'react';

interface WebSocketProps {
  users: { id: string; name: string; color: string }[]
}

const useWebSocket = ({ users }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => ws.close();
  }, []);

  return ws;
}

export default useWebSocket;