{"import React from 'react';
import { useState, useEffect } from 'react';

interface Cursor {
  id: string;
  x: number;
  y: number;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const cursorPositions = cursors.reduce((acc, cursor) => {
      acc[cursor.id] = `${cursor.x},${cursor.y}`;
      return acc;
    }, {});
    setCursorPositions(cursorPositions);
  }, [cursors]);

  const handleCursorUpdate = (cursor: Cursor) => {
    setCursorPositions((prevPositions) => {
      const updatedPositions = {
        ...prevPositions,
        [cursor.id]: `${cursor.x},${cursor.y}`,
      };
      return updatedPositions;
    });
  }

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((cursorId) => (
        <div key={cursorId} style={{
          position: 'absolute',
          left: cursorPositions[cursorId].split(',')[0],
          top: cursorPositions[cursorId].split(',')[1],
          width: '2px',
          height: '2px',
          backgroundColor: 'white',
          borderRadius: '50%',
        }}>
        <span style={{
          position: 'absolute',
          left: cursorPositions[cursorId].split(',')[0] + 5,
          top: cursorPositions[cursorId].split(',')[1] + 5,
          fontSize: '12px',
          color: 'white',
        }}>{cursors.find((cursor) => cursor.id === cursorId).name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;