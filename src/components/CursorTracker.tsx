{"import React from 'react';
import { useState, useEffect } from 'react';
import { Cursor } from './types';

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  const [cursorPositions, setCursorPositions] = useState({} as { [id: string]: number });

  useEffect(() => {
    const cursorPositions = cursors.reduce((acc, cursor) => {
      acc[cursor.id] = cursor.position;
      return acc;
    }, {});
    setCursorPositions(cursorPositions);
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {Object.keys(cursorPositions).map((id, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: cursorPositions[id] + 'px',
          top: '10px',
          width: '2px',
          height: '10px',
          backgroundColor: cursors.find((cursor) => cursor.id === id).color,
        }}>
        <span style={{
          position: 'absolute',
          left: cursorPositions[id] + 'px',
          top: '-15px',
          fontSize: '12px',
          color: 'white',
        }}>{cursors.find((cursor) => cursor.id === id).name}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;