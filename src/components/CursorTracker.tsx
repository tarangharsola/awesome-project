{"import React from 'react';
import { Cursor } from './Cursor';

interface CursorTrackerProps {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: CursorTrackerProps) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div key={index} className="cursor-item">
          <span className="username">{cursor.username}</span>
          <span className="color" style={{ backgroundColor: cursor.color }}></span>
          <span className="cursor-position">{cursor.position}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;