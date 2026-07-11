{"import { useState, useEffect } from 'react';

const useCursor = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0, color: '' });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY, color: e.target.dataset.color });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return cursor;
};

export default useCursor;