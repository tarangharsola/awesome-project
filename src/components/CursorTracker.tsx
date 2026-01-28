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
    const positions: { [id: string]: number } = {};
    cursors.forEach((cursor) => {
      positions[cursor.id] = cursor.position;
    });
    setCursorPositions(positions);
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id, index) => (
        <div key={index} style={{
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          color: "#fff",
          position: "absolute",
          top: cursorPositions[id] + "px",
          left: "10px",
          padding: "5px",
          borderRadius: "5px",
          display: "inline-block",
          margin: "5px",
        }}>
          {cursors.find((cursor) => cursor.id === id).name}
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;