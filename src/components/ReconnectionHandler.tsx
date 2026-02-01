{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const { reconnect, isReconnecting } = useWebSocket();

  useEffect(() => {
    if (isReconnecting) setReconnecting(true);
    return () => setReconnecting(false);
  }, [isReconnecting]);

  if (reconnecting) return <div>Reconnecting...</div);

  return children;
};

export default ReconnectionHandler;