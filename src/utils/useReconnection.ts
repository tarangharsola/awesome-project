{"import { useState, useEffect } from 'react';
import { ws } from './ws';

function useReconnection() {
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    ws.onopen = () => {
      setReconnected(true);
    };
    ws.onclose = () => {
      setReconnected(false);
    };
  }, []);

  return reconnected;
}

export default useReconnection;