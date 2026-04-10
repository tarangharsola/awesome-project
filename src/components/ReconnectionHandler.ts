{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      setReconnecting(true);
    } else {
      setReconnecting(false);
    }
  }, [connectionStatus]);

  const handleReconnect = () => {
    reconnect();
    setRetryCount(0);
  };

  return (
    <div>
      {reconnecting ? (
        <div>
          Reconnecting...
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
export default ReconnectionHandler;