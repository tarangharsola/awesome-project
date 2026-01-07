{"import { useState, useEffect } from 'react';

interface useCursor {
  cursorPosition: number;
  cursorColor: string;
}

const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorColor, setCursorColor] = useState('');

  useEffect(() => {
    // implementation...
  }, []);

  return {
    cursorPosition,
    cursorColor,
  };
}

export default useCursor;