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
      {cursors.map((cursor, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: cursor.x,
          top: cursor.y,
          backgroundColor: cursor.color,
          width: 2,
          height: 10,
        }}>
          <span>{cursor.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;