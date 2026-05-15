{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; username: string; color: string; }
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor" style={{
      left: cursor.x + 'px',
      top: cursor.y + 'px',
      backgroundColor: cursor.color
    }}>
      <span className="username">{cursor.username}</span>
    </div>
  );
};

export default CursorTracker;