{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { name: string; color: string; }
}

const CursorTracker = ({ cursor, user }) => {
  return (
    <div className="cursor" style={{
      left: cursor.x + 'px',
      top: cursor.y + 'px',
      backgroundColor: user.color,
    }}></div>
  );
};

export default CursorTracker;