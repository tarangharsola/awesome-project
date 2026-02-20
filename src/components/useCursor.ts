{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface CursorState {
  id: string;
  x: number;
  y: number;
}

const useCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>({ id: '', x: 0, y: 0 });
  const socket = io();

  useEffect(() => {
    socket.on('cursorPosition', (cursorPosition: { id: string; x: number; y: number }) => {
      setCursorState(cursorPosition);
    });
  }, []);

  return cursorState;
};

export default useCursor;