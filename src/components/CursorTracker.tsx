{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div className="cursor" style={{
      backgroundColor: user.color,
      color: 'white'
    }}>
      {cursor.position}
    </div>
  );
};

export default CursorTracker;