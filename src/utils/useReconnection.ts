{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    const handleReconnectSuccess = () => {
      setReconnected(true);
      setReconnecting(false);
    };

    return () => {
      // Clean up
    };
  }, []);

  return { reconnecting, reconnected, handleReconnect, handleReconnectSuccess };
};

export default useReconnection;