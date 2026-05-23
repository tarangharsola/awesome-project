{"import { useState, useEffect } from 'react';

interface Props {
  cursor: { x: number; y: number; }
}

const useCursor = (cursor: Props['cursor']) => {
  const [cursorPosition, setCursorPosition] = useState(cursor);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCursorPosition(cursor);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return cursorPosition;
};

export default useCursor;