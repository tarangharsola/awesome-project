{"import React from 'react';
import { useCursor } from '../useCursor';

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
        color: "#fff",
        marginLeft: "10px",
      }}>{cursorPosition}</span>
    </div>
  );
};

export default CursorTracker;