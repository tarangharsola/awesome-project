{"import React from 'react';
import { useCursor } from './useCursor';

const CursorTracker = () => {
  const cursor = useCursor();
  return (
    <div style={{ position: 'absolute', top: cursor.y, left: cursor.x, width: 2, height: 10, backgroundColor: 'red' }} />
  );
};

export default CursorTracker;