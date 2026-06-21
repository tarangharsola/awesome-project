{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { connect, disconnect } = useWebSocket();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setReconnecting(true);
      connect(() => {
        setReconnecting(false);
      }, () => {
        setReconnecting(true);
      });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return reconnecting;
};
export default useReconnection;