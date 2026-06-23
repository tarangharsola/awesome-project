{"import React from 'react';
import { useCursor } from './useCursor';

const CursorTracker = ({ cursors }) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div
          key={cursor.id}
          className="cursor"
          style={{
            left: cursor.x,
            top: cursor.y,
            backgroundColor: cursor.color,
          }}
        />
      ))}
    </div>
  );
};

export default CursorTracker;