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
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const cursorPositionsMap = cursors.reduce((acc, cursor) => ({ ...acc, [cursor.id]: cursor }), {});
    setCursorPositions(cursorPositionsMap);
  }, [cursors]);

  return (
    <div>
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          position: 'absolute',
          left: cursorPositions[id].x,
          top: cursorPositions[id].y,
          width: '5px',
          height: '5px',
          backgroundColor: cursorPositions[id].color,
          borderRadius: '5px',
        }}>
        {cursorPositions[id].name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;