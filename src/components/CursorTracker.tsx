{"import React from 'react';
import { Editor } from './Editor';

interface Props {
  cursors: { name: string; color: string; position: number }[];
}

const CursorTracker = ({ cursors }) => {
  return (
    <div className="cursor-tracker">
      {cursors.map((cursor, index) => (
        <div key={index} className="cursor-item">
          <span className="name">{cursor.name}</span>
          <span className="color" style={{ backgroundColor: cursor.color }}></span>
          <span className="position">{cursor.position}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;