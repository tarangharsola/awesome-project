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
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const cursorPositions = cursors.reduce((acc, cursor) => {
      acc[cursor.id] = cursor.position;
      return acc;
    }, {});
    setCursorPositions(cursorPositions);
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
          position: "absolute",
          top: cursorPositions[id] + "px",
          left: "0px",
          width: "2px",
          height: "2px",
          borderRadius: "50%",
        }}>
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;