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
        <div key={cursor.id} className="cursor-item">
          <span className="cursor-label" style={{
            color: cursor.color
          }}>{cursor.id}</span>
          <span className="cursor-position">({cursor.x}, {cursor.y})</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;