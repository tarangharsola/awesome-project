import { useState, useEffect } from 'react';

interface useReconnectionProps {
  webSocket: any;
}

const useReconnection = ({ webSocket }: useReconnectionProps) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    webSocket.reconnect(handleReconnect);
    return () => {
      webSocket.reconnect(null);
    };
  }, [webSocket]);

  return reconnecting;
};

export default useReconnection;