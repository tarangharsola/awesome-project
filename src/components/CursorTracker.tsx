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
          color: "#fff",
          position: "absolute",
          top: cursorPositions[id] + "px",
          left: "10px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
        }}>
        {cursors.find((cursor) => cursor.id === id).name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;