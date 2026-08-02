{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  url: string;
}

const useWebSocket = ({ url }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);

    return () => ws.close();
  }, [url]);

  const send = (data: any) => {
    if (ws) ws.send(JSON.stringify(data));
  };

  return { send };
}

export default useWebSocket;