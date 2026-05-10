{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionProps {
  children: React.ReactNode;
}

const Reconnection = ({ children }: ReconnectionProps) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setReconnecting(true);
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, reconnect, retryCount]);

  const handleReconnect = () => {
    reconnect();
    setReconnecting(false);
    setRetryCount(0);
  };

  return (
    <div>
      {children}
      {reconnecting ? (
        <div>
          Reconnecting... ({retryCount} retries)
          <button onClick={handleReconnect}>Retry</button>
        </div>
      ) : (
        <div>
          Connected
        </div>
      )}
    </div>
  );
};

export default Reconnection;