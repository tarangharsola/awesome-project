{"import { useState, useEffect } from 'react';

interface Props {
  userId: string;
}

const useCursor = ({ userId }: Props) => {
  const [cursorColor, setCursorColor] = useState(
    () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    }
  );

  useEffect(() => {
    // Update cursor color on user reconnection
  }, []);

  return { cursorColor, setCursorColor };
}

export default useCursor;