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
      width: '5px',
      height: '5px',
      borderRadius: '5px'
    }}>
      {user.name}
    </div>
  );
};

export default CursorTracker;