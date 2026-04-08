{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; name: string; color: string; }
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor" style={{
      left: cursor.x + 'px',
      top: cursor.y + 'px',
      backgroundColor: cursor.color,
    }}>
      {cursor.name}
    </div>
  );
};

export default CursorTracker;