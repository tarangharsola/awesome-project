{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

function useWebSocket(url) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        dispatch({ type: 'users', users: data.users });
      } else if (data.type === 'editor') {
        dispatch({ type: 'editor', editor: data.editor });
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return ws;
}

export default useWebSocket;