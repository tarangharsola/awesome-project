{"import { useState, useEffect } from 'react';

interface ReconnectionProps {
  reconnection: any;
}

const useReconnection = (reconnection: ReconnectionProps) => {
  const [reconnect, setReconnect] = useState(() => () => {});
  useEffect(() => {
    const handleReconnection = () => {
      setReconnect(() => reconnection.reconnect);
    };
    reconnection.addEventListener('reconnect', handleReconnection);
    return () => {
      reconnection.removeEventListener('reconnect', handleReconnection);
    };
  }, [reconnection]);
  return { reconnect };
};

export default useReconnection;