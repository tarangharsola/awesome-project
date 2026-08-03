{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { send, close } = useWebSocket();

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

  const handleConnectionStatusChange = (status) => {
    setConnectionStatus(status);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={() => close()}>Disconnect</button>
      <button onClick={() => send('ping')}>Ping</button>
    </div>
  );
};

export default WebSocket;