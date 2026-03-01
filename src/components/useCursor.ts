{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface Props {
  cursor: { x: number; y: number; }
  userId: string;
  color: string;
}

const useCursor = ({ cursor, userId, color }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleCursorUpdate = () => {
      setCursorPosition(cursor);
    };
    return () => {
      // Clean up
    };
  }, [cursor]);

  return cursorPosition;
}

export default useCursor;