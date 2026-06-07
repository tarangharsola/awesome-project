{"import { useState, useEffect } from 'react';

interface Props {
  cursor: { x: number; y: number; }
}

const useCursor = ({ cursor }: Props) => {
  const [cursorState, setCursorState] = useState(cursor);
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorState({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return cursorState;
}

export default useCursor;