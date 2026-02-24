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

  const handleConnect = () => {
    setConnected(true);
    setRetryCount(0);
 );

  const handleDisconnect = () => {
    setConnected(false);
  }

  return (
    <div>
      {connected ? 'Connected' : `Disconnected (retry count: ${retryCount})`}
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
};

export default ReconnectionHandler;