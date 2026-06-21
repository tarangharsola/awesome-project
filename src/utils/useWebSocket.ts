{"import { useState, useEffect } from 'react';

interface WebSocketProps {
  url: string;
}

const useWebSocket = (props: WebSocketProps) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(props.url);
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);
  return { send: (data) => socket.send(JSON.stringify(data)) };
};

export default useWebSocket;