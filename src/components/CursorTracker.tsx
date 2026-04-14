{"import React from 'react';
import { useState, useEffect } from 'react';

interface Cursor {
  id: string;
  x: number;
  y: number;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  const [cursorPositions, setCursorPositions] = useState<Cursor[]>([]);

  useEffect(() => {
    const cursorPositionsList = cursors.map((cursor) => ({
      id: cursor.id,
      x: cursor.x,
      y: cursor.y,
    }));
    setCursorPositions(cursorPositionsList);
  }, [cursors]);

  return (
    <div>
      <h2>Cursor Positions:</h2>
      <ul>
        {cursorPositions.map((cursor, index) => (
          <li key={cursor.id} style={{
            position: 'absolute',
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: `2px solid ${colors[index]}`,
          }}>
            {cursor.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CursorTracker;