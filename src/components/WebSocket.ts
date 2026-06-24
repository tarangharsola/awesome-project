{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocketComponent = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const { connection, send, close } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        if (retryCount >= 3) {
          setConnectionStatus('reconnecting');
        }
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount]);

  const handleConnectionChange = (status) => {
    setConnectionStatus(status);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={() => send('ping')}>Send Ping</button>
      <button onClick={() => close()}>Close Connection</button>
    </div>
  );
};

export default WebSocketComponent;