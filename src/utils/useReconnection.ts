{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { socket } = useWebSocket();

  useEffect(() => {
    const handleSocketClose = () => {
      setReconnecting(true);
    };

    socket.on('close', handleSocketClose);

    return () => {
      socket.off('close', handleSocketClose);
    };
  }, []);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(false);
    };

    socket.on('reconnect', handleReconnect);

    return () => {
      socket.off('reconnect', handleReconnect);
    };
  }, []);

  return reconnecting;
};

export default useReconnection;