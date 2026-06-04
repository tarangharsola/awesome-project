{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useWebSocket(url) {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    return () => ws.close();
  }, []);

  return [ws, messages];
}

export default useWebSocket;