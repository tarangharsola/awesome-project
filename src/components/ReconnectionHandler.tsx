{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  webSocket: useWebSocket;
}

const ReconnectionHandler = ({ webSocket }: ReconnectionHandlerProps) => {
  const [reconnecting, setReconnecting] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (webSocket.isConnected) {
        clearInterval(intervalId);
        setReconnecting(false);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [webSocket.isConnected]);
  return (
    <div>
      {reconnecting ? 'Reconnecting...' : ''}
    </div>
  );
};

export default ReconnectionHandler;