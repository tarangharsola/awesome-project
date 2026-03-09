{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useCursor = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'cursor') {
        setCursor(message.data);
      }
    };
  }, []);

  return { cursor };
};

export default useCursor;