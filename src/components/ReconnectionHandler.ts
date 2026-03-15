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
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connected, retryCount]);

  return (
    <div>
      {connected ? 'Connected' : `Disconnected (retry count: ${retryCount})`}
    </div>
  );
};

export default ReconnectionHandler;