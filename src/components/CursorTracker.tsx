{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const cursor = useCursor();
  return (
    <div className="cursor-tracker">
      <span style={{
        position: "absolute",
        top: cursor.y,
        left: cursor.x,
        backgroundColor: cursor.color,
        width: "5px",
        height: "5px",
        borderRadius: "50%"
      }} />
    </div>
  );
};

export default CursorTracker;