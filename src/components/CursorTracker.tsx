{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; username: string; color: string; }
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor" style={{
      left: cursor.x,
      top: cursor.y,
      backgroundColor: cursor.color
    }}></div>
  );
};

export default CursorTracker;