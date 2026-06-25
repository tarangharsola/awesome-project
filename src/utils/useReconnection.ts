{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useReconnection() {
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setReconnected(true);
    };
    return () => ws.close();
  }, []);

  return reconnected;
}

export default useReconnection;