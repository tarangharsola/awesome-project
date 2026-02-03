{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const { reconnect, isReconnecting } = useWebSocket();

  useEffect(() => {
    if (isReconnecting) {
      setReconnecting(true);
    } else {
      setReconnecting(false);
    }
  }, [isReconnecting]);

  return (
    <div>
      {reconnecting ? (
        <div>Reconnecting...</div>
      ) : (
        children
      )}
    </div>
  );
};

export default ReconnectionHandler;