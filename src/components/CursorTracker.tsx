{"import React from 'react';
import { useCursor } from './useCursor';

function CursorTracker() {
  const { cursorPosition, user } = useCursor();

  return (
    <div className="cursor-label" style={{
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }}>
      {user.name}
    </div>
  );
}

export default CursorTracker;