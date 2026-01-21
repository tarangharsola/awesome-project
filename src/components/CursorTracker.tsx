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
  const [cursorPositions, setCursorPositions] = useState({} as { [id: string]: { x: number; y: number } });

  useEffect(() => {
    const cursorPositions: { [id: string]: { x: number; y: number } } = {};
    cursors.forEach((cursor) => {
      cursorPositions[cursor.id] = cursor;
    });
    setCursorPositions(cursorPositions);
  }, [cursors]);

  const handleCursorUpdate = (updatedCursor: Cursor) => {
    setCursorPositions((prevPositions) => {
      const updatedPositions = {
        ...prevPositions,
        [updatedCursor.id]: updatedCursor,
      };
      return updatedPositions;
    });
  }

  return (
    <div>
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          position: 'absolute',
          left: cursorPositions[id].x,
          top: cursorPositions[id].y,
          width: '2px',
          height: '2px',
          backgroundColor: 'black',
          borderRadius: '50%',
        }}>
        {id}
        </div>
      ))}
    </div>
  );
}

export default CursorTracker;