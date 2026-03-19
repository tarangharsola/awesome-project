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
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connected, retryCount]);

  const handleReconnect = () => {
    onReconnect();
    setConnected(true);
  };

  return (
    <div>
      {children}
      {retryCount > 0 && (
        <div>
          Connection lost. Retrying in {retryCount * 5000}ms...
        </div>
      )}
      {!connected && (
        <button onClick={handleReconnect}>Retry</button>
      )}
    </div>
  );
};

export default ReconnectionHandler;