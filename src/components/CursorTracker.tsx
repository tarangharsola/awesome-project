{"import React from 'react';
import { useState, useEffect } from 'react';
import { useCursor } from '../utils/useCursor';

const CursorTracker = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { cursor, users } = useCursor();

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ position: 'absolute', left: cursorPosition.x, top: cursorPosition.y, backgroundColor: 'red', width: 10, height: 10 }}>
      {users.map((user, index) => (
        <div key={index} style={{ position: 'absolute', left: user.x, top: user.y, backgroundColor: user.color, width: 10, height: 10 }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;