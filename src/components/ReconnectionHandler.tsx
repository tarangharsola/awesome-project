{"import React from 'react';
import { useReconnection } from './useReconnection';

const ReconnectionHandler = () => {
  const reconnection = useReconnection();

  return (
    <div>
      {reconnection.status === 'connected' ? 'Connected' : 'Disconnected'}
    </div>
  );
};

export default ReconnectionHandler;