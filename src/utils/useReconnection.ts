{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const reconnect = () => {
      setReconnecting(true);
      const newWs = new WebSocket('ws://localhost:8080');
      newWs.onopen = () => {
        setWs(newWs);
        setReconnecting(false);
      };
      newWs.onclose = () => {
        reconnect();
      };
    };

    reconnect();

    return () => {
      // Clean up reconnect function
    };
  }, []);

  return {
    reconnecting,
    ws
  };
};

export default useReconnection;