{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, users } = useCursor();

  return (
    <div className="cursor-tracker">
      <h2>Cursors</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} style={{
            backgroundColor: user.color,
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            marginRight: '10px'
          }}>
            {user.name} ({cursor.position.x}, {cursor.position.y})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CursorTracker;