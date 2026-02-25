{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      if (event.data === 'reconnecting') {
        setReconnecting(true);
      } else if (event.data === 'connected') {
        setConnected(true);
      }
    };
  }, []);

  return { reconnecting, connected };
};

export default useReconnection;