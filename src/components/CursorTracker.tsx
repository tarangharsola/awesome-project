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
          <span className="cursor-name">{cursor.name}</span>
          <span className="cursor-color" style={{ backgroundColor: cursor.color }}></span>
          <span className="cursor-position">{cursor.position}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;