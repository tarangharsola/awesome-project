// Import required modules
import { useState, useEffect } from 'react';

// Define the useCursor hook
const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Update cursor position on window resize
    const handleResize = () => {
      setCursorPosition({ x: window.innerWidth, y: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return cursorPosition;
};

export default useCursor;