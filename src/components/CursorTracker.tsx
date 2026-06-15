{"import React from 'react';
import { Editor } from './Editor';

interface Props {
  cursor: { x: number; y: number; user: string; color: string; };
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor-tracker">
      <span className="cursor" style={{ left: cursor.x, top: cursor.y, backgroundColor: cursor.color }}></span>
      <span className="username">{cursor.user}</span>
    </div>
  );
};

export default CursorTracker;