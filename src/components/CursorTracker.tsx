{"import React from 'react';
import { useCursor } from './useCursor';

const CursorTracker = () => {
  const cursor = useCursor();
  return (
    <div style={{ position: 'absolute', left: cursor.x, top: cursor.y, width: 2, height: 2, backgroundColor: cursor.color }} />
  );
};

export default CursorTracker;