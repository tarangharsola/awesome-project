{"import React from 'react';
import { useCursor } from '../utils/useCursor';

const CursorTracker = () => {
  const { cursor, users } = useCursor();

  return (
    <div className="cursor-tracker">
      {users.map((user, index) => (
        <div key={index} style={{
          position: 'absolute',
          top: cursor.y,
          left: cursor.x,
          width: '2px',
          height: '2px',
          backgroundColor: user.color,
          borderRadius: '50%',
        }}>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;