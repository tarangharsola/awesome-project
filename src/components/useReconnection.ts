{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnect, setReconnect] = useState(() => () => {});
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionError) {
        setReconnect(() => () => {
          // implement retry logic here
        });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionError]);

  return { reconnect, connectionError };
};
export default useReconnection;