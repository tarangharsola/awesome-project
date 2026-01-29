{"import React from 'react';
import { useState, useEffect } from 'react';

interface Cursor {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const cursorPositions: { [key: string]: { x: number; y: number } } = {};
    cursors.forEach((cursor) => {
      cursorPositions[cursor.id] = { x: cursor.x, y: cursor.y);
    });
    setCursorPositions(cursorPositions);
  }, [cursors]);

  const handleCursorUpdate = (cursor: Cursor) => {
    setCursorPositions((prevPositions) => {
      const updatedPositions = { ...prevPositions);
      updatedPositions[cursor.id] = { x: cursor.x, y: cursor.y);
      return updatedPositions;
    });
  };

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((cursorId) => (
        <div key={cursorId} style={{
          position: 'absolute',
          left: cursorPositions[cursorId].x,
          top: cursorPositions[cursorId].y,
          width: '5px',
          height: '5px',
          backgroundColor: cursors.find((c) => c.id === cursorId).color,
          borderRadius: '50%',
        }}>
        <span style={{
          position: 'absolute',
          left: cursorPositions[cursorId].x + 10,
          top: cursorPositions[cursorId].y - 10,
          fontSize: '12px',
          color: 'white',
        }}>{cursors.find((c) => c.id === cursorId).name}</span>
      ))}
    </div>
  );
};

export default CursorTracker;