{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { webSocket, reconnect } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!webSocket || webSocket.readyState === WebSocket.CLOSED) {
        setReconnecting(true);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [webSocket]);

  return (
    <div>
      {reconnecting ? 'Reconnecting...' : ''}
    </div>
  );
};

export default ReconnectionHandler;