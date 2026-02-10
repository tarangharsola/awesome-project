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
  const [cursorPositions, setCursorPositions] = useState({} as { [id: string]: { x: number; y: number } });

  useEffect(() => {
    setCursorPositions(cursors.reduce((acc, cursor) => ({ ...acc, [cursor.id]: { x: cursor.x, y: cursor.y } }), {}));
  }, [cursors]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
    }}>
      {Object.keys(cursorPositions).map((id, index) => (
        <div key={index} style={{
          position: 'absolute',
          top: cursorPositions[id].y,
          left: cursorPositions[id].x,
          width: 10,
          height: 10,
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          borderRadius: 50,
        }}/>
      ))}
    </div>
  );
};

export default CursorTracker;