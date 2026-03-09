{"import React from 'react';
import './CursorTracker.css';

interface Cursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor) => (
        <div key={cursor.id} className="cursor">
          <span className="name" style={{
            color: cursor.color
          }}>{cursor.name}</span>
          <span className="position">({cursor.x}, {cursor.y})</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;