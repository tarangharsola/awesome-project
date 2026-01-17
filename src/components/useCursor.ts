{"import { useState, useEffect } from 'react';

interface useCursor {
  cursors: { name: string; color: string }[];
}

const useCursor = () => {
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      setCursors((prevCursors) => [...prevCursors, cursor]);
    };

    return () => {
      // Clean up
    };
  }, []);

  return { cursors };
};

export default useCursor;