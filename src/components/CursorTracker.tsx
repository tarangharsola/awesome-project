{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div className="cursor-label" style={{
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      backgroundColor: user.color,
      color: 'white',
      padding: '5px',
      borderRadius: '5px'
    }}>
      {user.name}
    </div>
  );
};

export default CursorTracker;