{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { reconnect } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAttempt((prevAttempt) => prevAttempt + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (attempt > 3) {
      setReconnecting(true);
    }
  }, [attempt]);

  return reconnect;
};

export default useReconnection;