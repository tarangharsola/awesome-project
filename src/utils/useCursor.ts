import { useState, useEffect } from 'react';

const useCursor = (userId: string) => {
  const [cursorColor, setCursorColor] = useState('#' + Math.floor(Math.random() * 16777215).toString(16));
  useEffect(() => {
    // Update cursor color here
  }, []);
  return { cursorColor, userId };
};

export default useCursor;