{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retries, setRetries] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnectionStatus('Connected');
    };
    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      setRetries(retries + 1);
    };
    ws.onerror = () => {
      setConnectionStatus('Error');
    };
  }, []);

  const retry = () => {
    setRetries(0);
    ws.reconnect();
  };

  return {
    connectionStatus,
    retries,
    retry
  };
};
export default useReconnection;