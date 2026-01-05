{"import React from 'react';
import { useCursor } from './useCursor';

const CursorTracker = () => {
  const { cursorPosition, userColor } = useCursor();
  return (
    <div style={{
      position: 'absolute',
      top: cursorPosition.y,
      left: cursorPosition.x,
      backgroundColor: userColor,
      width: 10,
      height: 10,
    }} />
  );
};

export default CursorTracker;