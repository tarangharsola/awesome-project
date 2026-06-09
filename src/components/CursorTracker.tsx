{"import React from 'react';
import { Editor } from './Editor';

interface CursorTrackerProps {
  cursors: { username: string; x: number; y: number; color: string }[];
}

const CursorTracker = ({ cursors }: CursorTrackerProps) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div key={index} className="cursor">
          <span className="username">{cursor.username}</span>
          <span className="color" style={{ backgroundColor: cursor.color }}></span>
          <span className="position">({cursor.x}, {cursor.y})</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;