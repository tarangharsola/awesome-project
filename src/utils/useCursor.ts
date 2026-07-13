{"import { useState, useEffect } from 'react';

interface Props {
  userId: string;
}

const useCursor = (userId: string) => {
  const [cursorColor, setCursorColor] = useState('#' + Math.floor(Math.random() * 16777215).toString(16));
  return { cursorColor };
};

export default useCursor;