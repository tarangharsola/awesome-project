{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnect, setReconnect] = useState(() => () => {});
  const [connectionError, setConnectionError] = useState(null);
  const { reconnect: wsReconnect, connectionError: wsConnectionError } = useWebSocket();

  useEffect(() => {
    setReconnect(wsReconnect);
    setConnectionError(wsConnectionError);
  }, [wsReconnect, wsConnectionError]);

  return { reconnect, connectionError };
};
export default useReconnection;