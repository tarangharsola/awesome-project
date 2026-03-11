{"import React from 'react';
import './CursorTracker.css';

interface Cursor {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor) => (
        <div key={cursor.id} className="cursor" style={{
          left: cursor.x + "px",
          top: cursor.y + "px",
          backgroundColor: cursor.color,
          color: "#fff",
        }}>
          {cursor.id}
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;