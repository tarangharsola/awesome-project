{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  color: string;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ cursor, color }) => {
  const { x, y } = cursor;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 2,
        height: 10,
        backgroundColor: color,
      }}
    />
  );
}

export default CursorTracker;