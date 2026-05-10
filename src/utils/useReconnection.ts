{"import { useState, useEffect } from 'react';
import { WebSocket } from './WebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  useEffect(() => {
    // Handle reconnection logic
  }, [reconnecting]);
  return [reconnecting, setReconnecting];
};

export default useReconnection;