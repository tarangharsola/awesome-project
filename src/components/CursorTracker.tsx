{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div>
      <span style={{
        backgroundColor: user.color,
        padding: '5px',
        borderRadius: '5px',
        display: 'inline-block',
        margin: '5px'
      }}>{user.name}</span>
      <span style={{
        position: 'absolute',
        top: cursor.y,
        left: cursor.x,
        backgroundColor: user.color,
        width: '5px',
        height: '5px',
        borderRadius: '5px'
      }}></span>
    </div>
  );
};

export default CursorTracker;