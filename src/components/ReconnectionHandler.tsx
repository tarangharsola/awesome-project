{"import React from 'react';
import { useReconnection } from './useReconnection';

const ReconnectionHandler = () => {
  const reconnect = useReconnection();
  return (
    <div>
      <button onClick={reconnect}>Reconnect</button>
    </div>
  );
};

export default ReconnectionHandler;