{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<Props> = ({ children, onReconnect }) => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        onReconnect();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connected, onReconnect]);

  return (
    <div>
      {children}
      <p>Connection status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Retry count: {retryCount}</p>
    </div>
  );
};

export default ReconnectionHandler;