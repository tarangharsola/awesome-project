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
          <span className="cursor-label" style={{
            backgroundColor: cursor.color,
            color: 'white',
            padding: '2px 4px',
            borderRadius: '4px',
            fontSize: '12px',
          }}>
            {cursor.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;