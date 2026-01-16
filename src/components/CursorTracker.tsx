{"import React from 'react';
import { useCursor } from './useCursor';

const CursorTracker = () => {
  const cursor = useCursor();

  return (
    <div>
      <span style={{
        position: 'absolute',
        top: cursor.y,
        left: cursor.x,
        backgroundColor: cursor.color,
        width: 2,
        height: 2,
      }} />
    </div>
  );
};

export default CursorTracker;