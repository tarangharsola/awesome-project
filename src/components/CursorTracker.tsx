{"import React from 'react';
import { useCursor } from '../store/userReducer';

const CursorTracker = () => {
  const { cursor } = useCursor();

  return (
    <div className="cursor">
      <span className="username">{cursor.username}</span>
      <span className="color" style={{ backgroundColor: cursor.color }}></span>
    </div>
  );
};

export default CursorTracker;