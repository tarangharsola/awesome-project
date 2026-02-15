{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { reconnect, error } = useWebSocket();

  useEffect(() => {
    if (error) {
      setReconnecting(true);
    }
  }, [error]);

  const handleReconnect = () => {
    reconnect();
  };

  return (
    <div>
      {reconnecting ? (
        <div>Reconnecting...</div>
      ) : (
        <button onClick={handleReconnect}>Reconnect</button>
      )}
    </div>
  );
};

export default ReconnectionHandler;