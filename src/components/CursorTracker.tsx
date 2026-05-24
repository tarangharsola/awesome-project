{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, updateCursor } = useCursor();

  return (
    <div className="cursor" style={{
      left: cursor.x,
      top: cursor.y,
      backgroundColor: cursor.color,
      width: '5px',
      height: '5px',
      borderRadius: '5px',
    }} />
  );
};

export default CursorTracker;