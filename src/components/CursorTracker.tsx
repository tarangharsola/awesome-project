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
          <span style={{
            backgroundColor: cursor.color,
            position: 'absolute',
            left: cursor.x + 'px',
            top: cursor.y + 'px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            zIndex: 1
          }}></span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;