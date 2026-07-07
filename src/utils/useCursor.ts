{"import { useState, useEffect } from 'react';
import { editorReducer } from '../store/editorReducer';

function useCursor() {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursorUpdate') {
        setCursorPosition(data.cursorPosition);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return cursorPosition;
}

export default useCursor;