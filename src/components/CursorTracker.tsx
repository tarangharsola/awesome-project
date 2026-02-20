{"import React from 'react';
import { useCursor } from '../useCursor';

function CursorTracker() {
  const { cursor, name, color } = useCursor();

  return (
    <div className="cursor" style={{
      backgroundColor: color,
      color: 'white',
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      zIndex: 1
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;