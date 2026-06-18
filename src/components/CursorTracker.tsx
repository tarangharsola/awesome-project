{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; username: string; color: string; }
}

const CursorTracker = ({ cursor }: CursorTrackerProps) => {
  return (
    <div className="cursor-tracker">
      <span className="cursor-label">{cursor.username}</span>
      <span className="cursor-color" style={{ backgroundColor: cursor.color }}></span>
    </div>
  );
}

export default CursorTracker;