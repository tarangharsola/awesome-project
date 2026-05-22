{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);

    ws.onmessage = (event) => {
      console.log(event.data);
   );

    ws.onerror = (event) => {
      setError(event.data);
   );

    return () => {
      ws.close();
    };
  }, [url]);

  return { ws, error };
};

export default useWebSocket;