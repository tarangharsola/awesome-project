{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { id: string; x: number; y: number; color: string };
}

const CursorTracker = ({ cursor }: CursorTrackerProps) => {
  return (
    <div className="cursor" style={{ left: cursor.x, top: cursor.y, backgroundColor: cursor.color }} />
  );
};

export default CursorTracker;