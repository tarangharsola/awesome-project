{"import { useState, useEffect } from 'react';
import { ws } from './ws';

function useWebSocket() {
  const [ws, setWs] = useState(ws);

  useEffect(() => {
    setWs(ws);
  }, [ws]);

  return ws;
}

export default useWebSocket;