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
      {cursors.map((cursor, index) => (
        <div key={index} style={{
          backgroundColor: cursor.color,
          position: 'absolute',
          left: `${cursor.position}px`,
          top: '10px',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
        }}>
          {cursor.name}
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;