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
        <div key={cursor.id} className="cursor">
          <span className="cursor-dot" style={{
            backgroundColor: cursor.color,
            left: cursor.x + "px",
            top: cursor.y + "px",
          }}>
          </span>
          <span className="cursor-label" style={{
            backgroundColor: cursor.color,
            color: "#fff",
          }}>{cursor.id}</span>
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;