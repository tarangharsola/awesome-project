{"import React from 'react';
import { useCursor } from '../utils/useCursor';

const CursorTracker = () => {
  const { cursor, users } = useCursor();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{
          position: 'absolute',
          top: cursor.top,
          left: cursor.left,
          backgroundColor: user.color,
          width: 2,
          height: 20,
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;