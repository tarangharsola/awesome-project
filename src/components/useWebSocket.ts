{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        setEditorState(data.content);
      }
    };
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
    };
    return () => {
      ws.close();
    };
  }, []);

  return {
    ws,
    connected
  };
};

export default useWebSocket;