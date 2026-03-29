{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursorPosition, user } = useCursor();

  return (
    <div className="cursor-tracker">
      <span style={{
        backgroundColor: user.color,
        color: "#fff",
        padding: "5px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}>
        <span>{user.name}</span>
        <span> ({cursorPosition})</span>
      </span>
    </div>
  );
};

export default CursorTracker;