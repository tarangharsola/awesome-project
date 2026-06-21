{"import { useState, useEffect } from 'react';

interface ReconnectionProps {
  reconnect: () => void;
}

const useReconnection = (props: ReconnectionProps) => {
  const [reconnecting, setReconnecting] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (reconnecting) {
        props.reconnect();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [reconnecting]);
  return reconnecting;
};

export default useReconnection;