{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Reconnection {
  reconnect(): void;
}

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { socket } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      // Implement reconnection logic here
      console.log('Reconnecting...');
    };

    socket.on('reconnect', handleReconnect);
    return () => socket.off('reconnect', handleReconnect);
  }, [socket]);

  return { reconnect: () => {
    // Implement reconnection logic here
    console.log('Reconnecting...');
  } };
};

export default useReconnection;