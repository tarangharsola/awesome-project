{"import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function useCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursor') {
        setCursorPosition(data.cursorPosition);
      }
    };
    return () => ws.close();
  }, []);

  return cursorPosition;
}

export default useCursor;