{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const cursor = useCursor();
  return (
    <div className="cursor-tracker">
      <span style={{
        backgroundColor: cursor.color,
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        display: 'inline-block',
        margin: '5px'
      }}>{cursor.name}</span>
    </div>
  );
};

export default CursorTracker;