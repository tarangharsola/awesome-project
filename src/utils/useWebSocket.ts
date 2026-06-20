{"import { useState, useEffect } from 'react';

interface Props {
  url: string;
}

const useWebSocket = ({ url }: Props) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    return () => {
      ws.close();
    };
  }, []);

  return [ws, send];
};

export default useWebSocket;