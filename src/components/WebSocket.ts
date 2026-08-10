{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const { send, close, reconnect } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'Disconnected') {
        setRetryCount(retryCount + 1);
        reconnect();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount, reconnect]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={() => reconnect()}>Retry</button>
    </div>
  );
};
export default WebSocket;