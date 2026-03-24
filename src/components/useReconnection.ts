{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnect, setReconnect] = useState(() => () => {});
  const { reconnect: wsReconnect } = useWebSocket();

  useEffect(() => {
    setReconnect(wsReconnect);
  }, [wsReconnect]);

  return reconnect;
};

export default useReconnection;