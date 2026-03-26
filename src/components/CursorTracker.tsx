{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  user: string;
  color: string;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ cursor, user, color }) => {
  const { x, y } = cursor;
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 2,
      height: 10,
      backgroundColor: color,
      zIndex: 1
    }} />
  );
}

export default CursorTracker;