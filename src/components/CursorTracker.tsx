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
  const [cursorPositions, setCursorPositions] = useState({} as { [id: string]: [number, number] });

  useEffect(() => {
    setCursorPositions(cursors.reduce((acc, cursor) => {
      acc[cursor.id] = [cursor.x, cursor.y];
      return acc;
    }, {}));
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          position: 'absolute',
          left: cursorPositions[id][0],
          top: cursorPositions[id][1],
          width: '2px',
          height: '2px',
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          borderRadius: '50%',
        }}>
        <span style={{
          position: 'absolute',
          left: cursorPositions[id][0] + 10,
          top: cursorPositions[id][1] - 10,
          fontSize: '12px',
          color: 'white',
        }}>{cursors.find((cursor) => cursor.id === id).name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;