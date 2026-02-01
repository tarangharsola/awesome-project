import { useState, useEffect } from 'react';

interface useCursor {
  cursors: { [key: string]: number };
  setCursor: (userId: string, cursorPosition: number) => void;
}

const useCursor = () => {
  const [cursors, setCursors] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const handleCursorChange = (userId: string, cursorPosition: number) => {
      setCursors((prevCursors) => ({ ...prevCursors, [userId]: cursorPosition }));
    };

    return handleCursorChange;
  }, []);

  const setCursor = (userId: string, cursorPosition: number) => {
    setCursors((prevCursors) => ({ ...prevCursors, [userId]: cursorPosition }));
  };

  return { cursors, setCursor };
};

export default useCursor;