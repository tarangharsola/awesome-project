{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const { send, close, reconnect } = useWebSocket();

  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        reconnect();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [connectionStatus, retryCount, reconnect]);

  const handleConnectionStatusChange = (status) => {
    setConnectionStatus(status);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={() => close()}>Close Connection</button>
      <button onClick={() => reconnect()}>Reconnect</button>
    </div>
  );
};
export default WebSocket;