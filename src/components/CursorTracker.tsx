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
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          color: "white",
          position: "absolute",
          top: cursorPositions[id] + "px",
          left: "10px",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
        }}>
        <span style={{
          position: "absolute",
          top: "-15px",
          left: "-15px",
          backgroundColor: "white",
          color: cursors.find((cursor) => cursor.id === id).color,
          padding: "5px",
          borderRadius: "5px",
        }}>{cursors.find((cursor) => cursor.id === id).name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;