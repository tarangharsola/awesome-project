{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div className="cursor" style={{
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      backgroundColor: user.color,
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      zIndex: 1000
    }}>
      {user.name}
    </div>
  );
};

export default CursorTracker;