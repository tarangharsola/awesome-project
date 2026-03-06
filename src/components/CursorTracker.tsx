{"import React from 'react';
import './CursorTracker.css';

interface Cursor {
  id: string;
  name: string;
  color: string;
  position: number;
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
            backgroundColor: cursor.color,
            color: "#fff",
          }}>
            {cursor.name}
          </span>
          <span className="position">{cursor.position}</span>
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;