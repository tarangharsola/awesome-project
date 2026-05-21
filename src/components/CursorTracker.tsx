{"import React from 'react';
import { useCursor } from '../utils/useCursor';

const CursorTracker = () => {
  const { cursor, username, color } = useCursor();

  return (
    <div className="cursor" style={{
      left: cursor.x,
      top: cursor.y,
      backgroundColor: color
    }}></div>
  );
};

export default CursorTracker;