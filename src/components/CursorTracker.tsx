{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from './Editor';

interface CursorTrackerProps {
  cursors: { id: string; x: number; y: number; color: string }[];
}

const CursorTracker = ({ cursors }: CursorTrackerProps) => {
  const [cursorPositions, setCursorPositions] = useState({} as { [id: string]: { x: number; y: number } });

  useEffect(() => {
    setCursorPositions(cursors.reduce((acc, cursor) => {
      acc[cursor.id] = { x: cursor.x, y: cursor.y };
      return acc;
    }, {}));
  }, [cursors]);

  return (
    <div style={{ position: 'absolute' }}>
      {Object.keys(cursorPositions).map((id) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            left: cursorPositions[id].x,
            top: cursorPositions[id].y,
            width: 2,
            height: 10,
            backgroundColor: cursor.color,
          }}
        />
      ))}
    </div>
  );
};

export default CursorTracker;