{"import React from 'react';
import { useCursor } from '../utils/useCursor';

const CursorTracker = () => {
  const { cursorPosition, user } = useCursor();

  return (
    <div className="cursor-tracker">
      <span style={{
        fontSize: "12px",
        color: "#fff",
      }}>{user.name}</span>
      <span style={{
        fontSize: "12px",
        color: "#ccc",
      }}>{cursorPosition}</span>
    </div>
  );
};

export default CursorTracker;