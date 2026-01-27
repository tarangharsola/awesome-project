{"import React from 'react';
import { useState, useEffect } from 'react';

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
  const [cursorPositions, setCursorPositions] = useState({} as { [id: string]: number });

  useEffect(() => {
    setCursorPositions(cursors.reduce((acc, cursor) => ({ ...acc, [cursor.id]: cursor.position }), {}));
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id, index) => (
        <div key={index} style={{
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          marginRight: '10px',
        }}>
          {cursors.find((cursor) => cursor.id === id).name} ({cursorPositions[id]})
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;