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
      {cursors.map((cursor, index) => (
        <div key={index} className="cursor">
          <span style={{ backgroundColor: cursor.color, left: cursor.x + 'px', top: cursor.y + 'px' }}></span>
          <span>{cursor.id}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;