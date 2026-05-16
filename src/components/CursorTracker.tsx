{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { name: string; color: string; }
}

const CursorTracker = ({ cursor, user }: Props) => {
  return (
    <div className="cursor" style={{ left: cursor.x, top: cursor.y, backgroundColor: user.color }}></div>
  );
};

export default CursorTracker;