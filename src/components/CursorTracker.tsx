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

const CursorTracker = ({ cursors }: Props) => {
  const [cursorPositions, setCursorPositions] = useState({} as { [id: string]: { x: number; y: number } });

  useEffect(() => {
    setCursorPositions(cursors.reduce((acc, cursor) => ({ ...acc, [cursor.id]: cursor }), {}));
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          position: 'absolute',
          left: cursorPositions[id].x,
          top: cursorPositions[id].y,
          width: '2px',
          height: '2px',
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          borderRadius: '50%',
        }}>
          {cursors.find((cursor) => cursor.id === id).name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;