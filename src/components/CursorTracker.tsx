{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursor, user } = useCursor();

  return (
    <div className="cursor-tracker">
      <span style={{
        backgroundColor: user.color,
        color: "#fff",
        padding: "5px",
        borderRadius: "5px",
        display: "inline-block",
        margin: "5px"
      }}>
        {user.name}
      </span>
      <span style={{
        position: "absolute",
        top: cursor.y,
        left: cursor.x,
        width: "5px",
        height: "5px",
        backgroundColor: user.color,
        borderRadius: "5px"
      }} />
    </div>
  );
};

export default CursorTracker;