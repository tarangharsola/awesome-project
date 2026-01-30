{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  onConnected: () => void;
  onDisconnected: () => void;
}

const ReconnectionHandler: React.FC<Props> = ({ children, onConnected, onDisconnected }) => {
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

  useEffect(() => {
    if (connected) {
      onConnected();
    } else {
      onDisconnected();
    }
  }, [connected, onConnected, onDisconnected]);

  return (
    <div>
      {children}
      {connected ? (
        <p>Connected</p>
      ) : (
        <p>Disconnected. Retries: {retryCount}</p>
      )}
    </div>
  );
};

export default ReconnectionHandler;