{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; username: string; color: string; }
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor-tracker">
      <span className="cursor-label">{cursor.username}</span>
      <span className="color-circle" style={{ backgroundColor: cursor.color }}></span>
    </div>
  );
};

export default CursorTracker;