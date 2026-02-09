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
      {cursorPositions.map((cursor) => (
        <div key={cursor.id} style={{ backgroundColor: cursor.color, position: 'absolute', left: cursor.x, top: cursor.y, width: 10, height: 10, borderRadius: 5, zIndex: 1 }}>
          <span style={{ color: 'white', position: 'absolute', left: 20, top: 5 }}>{cursor.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;