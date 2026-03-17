{"import React from 'react';
import { Cursor } from './Cursor';

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div key={index} className="cursor">
          <span className="username">{cursor.username}</span>
          <span className="color" style={{ backgroundColor: cursor.color }}></span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;