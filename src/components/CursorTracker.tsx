{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div style={{
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      backgroundColor: user.color,
      color: 'white',
      padding: '5px',
      borderRadius: '5px',
      cursor: 'pointer'
    }}
    >
      {user.name}
    </div>
  );
};

export default CursorTracker;