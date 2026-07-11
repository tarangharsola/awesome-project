{"import React from 'react';
import { useCursor } from '../utils/useCursor';

const CursorTracker = () => {
  const cursor = useCursor();
  return (
    <div style={{ position: 'absolute', top: cursor.y, left: cursor.x, backgroundColor: cursor.color, width: 2, height: 2 }} />
  );
};

export default CursorTracker;