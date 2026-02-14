{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const { reconnect } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        reconnect();
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [reconnecting, reconnect]);

  return (
    <div>
      {children}
      {reconnecting ? <div>Reconnecting...</div> : null}
    </div>
  );
};

export default ReconnectionHandler;