{"import React from 'react';
import { Cursor } from './Cursor';

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div key={index} className="cursor-item">
          <span className="username">{cursor.name}</span>
          <span className="color" style={{ backgroundColor: cursor.color }}></span>
          <span className="position">{cursor.position}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;"