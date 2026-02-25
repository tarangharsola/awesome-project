{"import { useState, useEffect } from 'react';

interface ReconnectionProps {
  reconnect: () => void;
}

const useReconnection = ({ reconnect }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReconnecting(true);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return reconnecting;
}

export default useReconnection;