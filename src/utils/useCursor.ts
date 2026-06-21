{"import { useState, useEffect } from 'react';

interface CursorProps {
  cursor: { x: number; y: number; }
}

const useCursor = (cursor: CursorProps) => {
  const [cursorState, setCursorState] = useState({ x: 0, y: 0 } as { x: number; y: number; });
  useEffect(() => {
    setCursorState(cursor);
  }, [cursor]);
  return cursorState;
};

export default useCursor;