{"import React, { useState, useEffect } from 'react';

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

  const handleReconnect = () => {
    setRetryCount(retryCount + 1);
    setConnected(true);
  };

  return (
    <div>
      {children}
      {retryCount > 0 && <p>Reconnecting... ({retryCount} retries)</p>}
    </div>
  );
};

export default ReconnectionHandler;