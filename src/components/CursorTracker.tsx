{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  user: { name: string; color: string; }
}

const CursorTracker = ({ cursor, user }: CursorTrackerProps) => {
  const { x, y } = cursor;
  const { name, color } = user;
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 2,
      height: 10,
      backgroundColor: color,
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;