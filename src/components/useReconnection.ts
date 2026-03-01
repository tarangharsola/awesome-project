{"import { useState, useEffect } from 'react';
import { useReconnection } from './useReconnection';

interface Props {
  reconnection: any;
}

const useReconnection = ({ reconnection }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };
    reconnection.on('reconnect', handleReconnect);
    return () => {
      reconnection.off('reconnect', handleReconnect);
    };
  }, [reconnection]);

  return reconnecting;
}

export default useReconnection;