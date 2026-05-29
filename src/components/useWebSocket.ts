{"import { useState, useEffect } from 'react';

const useWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnectionStatus('Connected');
    };
    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      setRetryCount(retryCount + 1);
      setTimeout(() => {
        ws.reconnect();
      }, 5000);
    };
    ws.onerror = () => {
      setConnectionStatus('Error');
    };
  }, []);

  return [connectionStatus, retryCount];
};
export default useWebSocket;