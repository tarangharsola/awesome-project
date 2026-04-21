{"import React from 'react';
import { useCursor } from './useCursor';

function CursorTracker() {
  const cursor = useCursor();
  return (
    <div style={{ position: 'absolute', top: cursor.y, left: cursor.x, backgroundColor: 'red', width: 2, height: 2 }} />
  );
}

export default CursorTracker;