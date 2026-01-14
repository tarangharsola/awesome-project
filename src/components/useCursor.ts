{"import { useState, useEffect } from 'react';

interface CursorState {
  position: number;
}

const useCursor = () => {
  const [cursor, setCursor] = useState<CursorState>({ position: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setCursor({ position: cursor.position + 1 });
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return cursor;
};

export default useCursor;