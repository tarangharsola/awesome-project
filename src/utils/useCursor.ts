{"import { useState, useEffect } from 'react';

interface Props {
  userId: string;
  cursor: { x: number; y: number; }
}

const useCursor = ({ userId, cursor }) => {
  const [cursorPosition, setCursorPosition] = useState(cursor);

  useEffect(() => {
    const handleCursorChange = (newCursor) => {
      setCursorPosition(newCursor);
    };

    return () => {
      // Clean up
    };
  }, []);

  return cursorPosition;
};

export default useCursor;