{"import React from 'react';
import { useCursor } from '../useCursor';

interface Cursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

const CursorTracker = () => {
  const cursor = useCursor();

  return (
    <div className="cursor" style={{
      left: cursor.x + 'px',
      top: cursor.y + 'px',
      backgroundColor: cursor.color,
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '5px'
    }}>
      {cursor.name}
    </div>
  );
};

export default CursorTracker;