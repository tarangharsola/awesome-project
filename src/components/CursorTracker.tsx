{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; name: string; color: string; }
}

const CursorTracker = ({ cursor }) => {
  return (
    <div className="cursor" style={{
      left: cursor.x + 'px',
      top: cursor.y + 'px',
      backgroundColor: cursor.color,
    }}>
      <span className="cursor-name">{cursor.name}</span>
    </div>
  );
};

export default CursorTracker;