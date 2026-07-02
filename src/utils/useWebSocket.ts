{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  url: string;
}

const useWebSocket = ({ url }) => {
  const [ws, setWs] = useState(null);
  const [send, setSend] = useState(() => () => {});
  const [receive, setReceive] = useState(() => () => {});

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    setSend((message) => {
      ws.send(JSON.stringify(message));
      return message;
    });
    setReceive((callback) => {
      ws.onmessage = (event) => {
        callback(JSON.parse(event.data));
      };
      return callback;
    });
    return () => {
      ws.close();
    };
  }, [url]);

  return { send, receive };
};

export default useWebSocket;