{"import React from 'react';
import { useCursor } from '../useCursor';

function CursorTracker() {
  const { cursor, user } = useCursor();

  return (
    <div style={{
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      backgroundColor: user.color,
      width: '5px',
      height: '5px',
      borderRadius: '5px'
    }}/>
  );
}

export default CursorTracker;