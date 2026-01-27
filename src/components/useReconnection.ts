{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface useReconnectionProps {
  roomId: string;
}

const useReconnection = ({ roomId }) => {
  const [reconnection, setReconnection] = useState(false);
  useEffect(() => {
    // implement reconnection logic here
  }, []);
  return reconnection;
};

export default useReconnection;