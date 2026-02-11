{"import React from 'react';
import { useState, useEffect } from 'react';

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

const CursorTracker: React.FC<Props> = ({ cursors }) => {
  const [cursorPositions, setCursorPositions] = useState<Cursor[]>([]);

  useEffect(() => {
    setCursorPositions(cursors);
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {cursorPositions.map((cursor, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: cursor.x,
          top: cursor.y,
          width: '10px',
          height: '10px',
          backgroundColor: cursor.color,
          borderRadius: '50%',
          zIndex: 1
        }}>
          <span style={{
            position: 'absolute',
            left: cursor.x + 15,
            top: cursor.y - 15,
            fontSize: '12px',
            color: 'white'
          }}>{cursor.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;