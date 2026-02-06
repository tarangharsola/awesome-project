{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const { reconnect, connected } = useWebSocket();

  useEffect(() => {
    if (!connected) {
      setReconnecting(true);
      reconnect();
    }
  }, [connected, reconnect]);

  if (reconnecting) return <div>Reconnecting...</div);

  return children;
};

export default ReconnectionHandler;