{"import React from 'react';
import { useCursor } from './useCursor';

function CursorTracker() {
  const { cursor, user } = useCursor();

  return (
    <div className="cursor-label" style={{
      position: "absolute",
      top: cursor.y,
      left: cursor.x,
      backgroundColor: user.color,
      color: "#fff",
      padding: "5px",
      borderRadius: "5px",
      display: "inline-block",
      zIndex: 1
    }}>
      {user.name}
    </div>
  );
}

export default CursorTracker;