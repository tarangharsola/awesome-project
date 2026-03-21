{"import React from 'react';
import { useState, useEffect } from 'react';

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
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const cursorPositions = cursors.reduce((acc, cursor) => ({ ...acc, [cursor.id]: cursor }), {});
    setCursorPositions(cursorPositions);
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          position: 'absolute',
          left: cursorPositions[id].x,
          top: cursorPositions[id].y,
          width: 2,
          height: 2,
          backgroundColor: cursorPositions[id].color,
        }}>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;