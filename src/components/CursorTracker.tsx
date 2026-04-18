{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div className="cursor-tracker">
      <span style={{
        backgroundColor: user.color,
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        position: 'absolute',
        top: cursor.y,
        left: cursor.x,
      }}>
        {user.name}
      </span>
    </div>
  );
};

export default CursorTracker;