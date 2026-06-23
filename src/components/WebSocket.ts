{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      const randomStatus = Math.random() < 0.5 ? 'Connected' : 'Disconnected';
      setConnectionStatus(randomStatus);
      if (randomStatus === 'Disconnected') {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retryConnection = () => {
    // Simulate retry logic
    console.log('Retrying connection...');
    setRetryCount(retryCount + 1);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retryConnection}>Retry Connection</button>
    </div>
  );
};
export default WebSocket;