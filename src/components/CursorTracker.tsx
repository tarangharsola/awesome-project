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
        <div key={index} style={{
          position: 'absolute',
          left: cursor.x,
          top: cursor.y,
          width: '2px',
          height: '2px',
          backgroundColor: cursor.color,
          borderRadius: '50%',
        }}>
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;