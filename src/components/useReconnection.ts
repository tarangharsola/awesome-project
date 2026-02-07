{"import { useState, useEffect } from 'react';
import { useWebSocket } from '../useWebSocket';

const useReconnection = () => {
  const [reconnect, setReconnect] = useState(() => () => {});
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const handleConnectionError = (error) => {
      setConnectionError(error);
    };

    const handleReconnect = () => {
      setReconnect(() => () => {});
      setConnectionError(null);
    };

    return () => {
      handleReconnect();
    };
  }, []);

  return {
    reconnect: reconnect,
    connectionError: connectionError
  };
};

export default useReconnection;