{"import React from 'react';
import './CursorTracker.css';

interface Props {
  cursor: { x: number; y: number; userId: string; color: string; };
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor" style={{
      left: cursor.x + "px",
      top: cursor.y + "px",
      backgroundColor: cursor.color,
      width: "5px",
      height: "5px",
      borderRadius: "50%",
    }}>
      <span>{cursor.userId}</span>
    </div>
  );
}

export default CursorTracker;