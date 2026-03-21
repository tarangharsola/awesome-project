{"import React from 'react';
import { useState, useEffect } from 'react';

const CursorTracker = ({ user, cursorPosition }) => {
  const [cursorLabel, setCursorLabel] = useState('');

  useEffect(() => {
    setCursorLabel(`${user.name} at ${cursorPosition}`);
  }, [user, cursorPosition]);

  return (
    <div style={{
      position: 'absolute',
      top: cursorPosition.y,
      left: cursorPosition.x,
      backgroundColor: '#333',
      color: '#fff',
      padding: 5,
      borderRadius: 5,
    }}>{cursorLabel}</div>
  );
};

export default CursorTracker;