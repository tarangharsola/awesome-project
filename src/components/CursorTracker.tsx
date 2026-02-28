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
    const cursorPositions = cursors.reduce((acc, cursor) => ({ ...acc, [cursor.id]: { x: cursor.x, y: cursor.y } }), {});
    setCursorPositions(cursorPositions);
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id, index) => (
        <div key={index} style={{
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          color: "#fff",
          position: "absolute",
          left: cursorPositions[id].x + "px",
          top: cursorPositions[id].y + "px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
        }}>
          {cursors.find((cursor) => cursor.id === id).name}
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;