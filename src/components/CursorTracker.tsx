{"import React from 'react';
import { useCursor } from '../utils/useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div className="cursor" style={{
      backgroundColor: user.color,
      color: 'white',
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      fontSize: '12px',
      zIndex: 1
    }}>
      {user.name}
    </div>
  );
};

export default CursorTracker;