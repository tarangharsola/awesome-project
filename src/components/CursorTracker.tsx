{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor } = useCursor();

  return (
    <div style={{
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      width: '5px',
      height: '5px',
      backgroundColor: cursor.color,
      borderRadius: '5px',
    }} />
  );
};

export default CursorTracker;