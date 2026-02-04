{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  reconnect: () => void;
}

const ReconnectionHandler = ({ reconnect }: ReconnectionHandlerProps) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        reconnect();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [reconnecting, reconnect]);

  return (
    <div>
      {reconnecting ? 'Reconnecting...' : ''}
    </div>
  );
};

export default ReconnectionHandler;