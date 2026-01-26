{"import { useState, useEffect } from 'react';

interface useReconnectionProps {
  reconnect: () => void;
}

const useReconnection = ({ reconnect }: useReconnectionProps) => {
  const [reconnecting, setReconnecting] = useState(false);
  useEffect(() => {
    setReconnecting(true);
    reconnect();
    setReconnecting(false);
  }, []);
  return reconnecting;
};

export default useReconnection;