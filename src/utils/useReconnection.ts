{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retries, setRetries] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetries(retries + 1);
        if (retries >= 3) {
          setConnectionStatus('reconnecting');
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retries]);

  return { retries, connectionStatus };
};
export default useReconnection;