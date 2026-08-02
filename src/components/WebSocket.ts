{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus: wsStatus } = useWebSocket();

  useEffect(() => {
    if (wsStatus === 'connected') {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('disconnected');
    }
  }, [wsStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (wsStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        reconnect();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [wsStatus, retryCount, reconnect]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};

export default WebSocket;