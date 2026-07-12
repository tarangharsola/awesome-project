{"import { useState, useEffect } from 'react';
import { cursorPosition } from './cursorPosition';

function useCursor() {
  const [cursorPosition, setCursorPosition] = useState(cursorPosition);

  useEffect(() => {
    setCursorPosition(cursorPosition);
  }, [cursorPosition]);

  return cursorPosition;
}

export default useCursor;