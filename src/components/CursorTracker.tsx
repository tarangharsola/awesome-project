{"import React from 'react';
import { Editor } from './Editor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; username: string; color: string; }
}

const CursorTracker = ({ cursor }: CursorTrackerProps) => {
  return (
    <div className="cursor-tracker">
      <span className="username">{cursor.username}</span>
      <span className="color" style={{ backgroundColor: cursor.color }}></span>
      <span className="cursor-position">({cursor.x}, {cursor.y})</span>
    </div>
  );
};

export default CursorTracker;