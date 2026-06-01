{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  url: string;
}

const useWebSocket = ({ url }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    };
  }, []);

  const send = (message) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  const receive = (callback) => {
    if (ws) {
      ws.onmessage = (event) => {
        callback(JSON.parse(event.data));
      };
    }
  };

  return [send, receive];
};

export default useWebSocket;