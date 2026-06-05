{"import React from 'react';
import { useWebSocket } from './useWebSocket';

function CursorTracker({ cursorPosition, users }) {
  const { cursor } = useWebSocket();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <div>Cursor Position: {cursorPosition.x}, {cursorPosition.y}</div>
    </div>
  );
}

export default CursorTracker;