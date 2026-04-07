{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<Props> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        reconnect();
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connected, reconnect, retryCount]);

  useEffect(() => {
    setConnected(connectionStatus === 'connected');
  }, [connectionStatus]);

  return (
    <div>
      {children}
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
}

export default ReconnectionHandler;