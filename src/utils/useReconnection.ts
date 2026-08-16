import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [reconnected, setReconnected] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setReconnected(!reconnected);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return reconnected;
};

export default useReconnection;