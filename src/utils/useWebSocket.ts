{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    return () => {
      ws.close();
    };
  }, []);

  return [socket, messages];
}

export default useWebSocket;