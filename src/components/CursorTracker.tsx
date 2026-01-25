{"import React from 'react';
import { useCursor } from './useCursor';

const CursorTracker = () => {
  const cursor = useCursor();

  return (
    <div style={{ position: 'absolute', top: cursor.y, left: cursor.x, width: 2, height: 2, backgroundColor: cursor.color }} />
  );
};

export default CursorTracker;