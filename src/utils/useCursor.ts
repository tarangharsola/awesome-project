{"import { useState, useEffect } from 'react';
import { editorReducer } from './editorReducer';

const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateCursorPosition') {
        setCursorPosition(data.cursorPosition);
      }
    };
    return () => ws.close();
  }, []);

  return cursorPosition;
};

export default useCursor;