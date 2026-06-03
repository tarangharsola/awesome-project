{"import React from 'react';
import { Editor } from './Editor';

interface Props {
  cursor: { x: number; y: number; userId: string; color: string; }
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor-tracker">
      <span className="cursor-label" style={{ backgroundColor: cursor.color }}></span>
      <span className="cursor-position">({cursor.x}, {cursor.y})</span>
    </div>
  );
};

export default CursorTracker;