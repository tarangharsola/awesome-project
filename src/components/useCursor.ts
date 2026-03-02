{"import { useState, useEffect } from 'react';

interface CursorState {
  id: string;
  x: number;
  y: number;
}

const useCursor = (cursorId: string) => {
  const [cursor, setCursor] = useState<CursorState>({ id: cursorId, x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({ id: cursorId, x: event.clientX, y: event.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [cursorId]);

  return cursor;
}

export default useCursor;