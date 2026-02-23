{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  userId: string;
  color: string;
}

const CursorTracker = ({ cursor, userId, color }: CursorTrackerProps) => {
  const { x, y } = cursor;
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 2,
      height: 20,
      backgroundColor: color,
    }}/>
  );
}

export default CursorTracker;