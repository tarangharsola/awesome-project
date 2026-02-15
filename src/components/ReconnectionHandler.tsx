{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  onReconnect: () => void;
}

const ReconnectionHandler = ({ children, onReconnect }: Props) => {
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
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};

export default ReconnectionHandler;