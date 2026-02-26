{"import React from 'react';
import { Editor } from './Editor';

interface Props {
  cursor: { x: number; y: number; userId: string; color: string };
}

const CursorTracker = ({ cursor }) => {
  return (
    <div className="cursor-tracker">
      <span style={{
        position: "absolute",
        left: cursor.x + "px",
        top: cursor.y + "px",
        backgroundColor: cursor.color,
        width: "2px",
        height: "2px",
        borderRadius: "50%"
      }}></span>
      <span className="cursor-label">{cursor.userId}</span>
    </div>
  );
};

export default CursorTracker;