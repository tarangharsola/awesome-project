{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, username, color } = useCursor();

  return (
    <div className="cursor">
      <span className="username">{username}</span>
      <span className="color" style={{ backgroundColor: color }}></span>
    </div>
  );
};

export default CursorTracker;