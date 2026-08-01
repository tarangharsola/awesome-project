{"import { useState, useEffect } from 'react';

interface Props {
  cursor: { x: number; y: number; }
}

const useCursor = ({ cursor }: Props) => {
  const [cursorPosition, setCursorPosition] = useState(cursor);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return cursorPosition;
}

export default useCursor;