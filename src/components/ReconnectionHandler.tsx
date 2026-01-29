{"import React from 'react';
import { useState, useEffect } from 'react';

const ReconnectionHandler = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connected, retryCount]);

  const retryConnection = () => {
    // implement retry logic here
  };

  return (
    <div>
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Retry Count: {retryCount}</p>
      <button onClick={retryConnection}>Retry Connection</button>
    </div>
  );
};
export default ReconnectionHandler;