{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { id: string; x: number; y: number; }
}

const CursorTracker = ({ cursor }: CursorTrackerProps) => {
  const { x, y } = useCursor(cursor);
  return (
    <div style={{
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: '2px',
      height: '2px',
      backgroundColor: 'red',
    }} />
  );
}

export default CursorTracker;