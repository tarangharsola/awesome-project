{"import { useState, useEffect } from 'react';

interface CursorProps {
  cursor: any;
}

const useCursor = (cursor: CursorProps) => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const handleCursorMove = () => {
      setPosition(cursor.position);
    };
    cursor.addEventListener('move', handleCursorMove);
    return () => {
      cursor.removeEventListener('move', handleCursorMove);
    };
  }, [cursor]);
  return { position };
};

export default useCursor;