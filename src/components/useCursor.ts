{"import { useState, useEffect } from 'react';

interface Props {
  cursor: { x: number; y: number; }
  user: { name: string; color: string }
}

const useCursor = ({ cursor, user }) => {
  const [cursorState, setCursorState] = useState(cursor);

  useEffect(() => {
    // implement cursor tracking logic here
  }, []);

  return { cursor: cursorState, user: user };
}

export default useCursor;