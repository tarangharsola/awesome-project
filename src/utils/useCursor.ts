{"import { useState, useEffect } from 'react';

interface CursorProps {
  x: number;
  y: number;
}

const useCursor = () => {
  const [cursor, setCursor] = useState<CursorProps>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return cursor;
}

export default useCursor;