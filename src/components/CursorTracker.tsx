{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; username: string; color: string; }
}

const CursorTracker = ({ cursor }: CursorTrackerProps) => {
  return (
    <div className="cursor" style={{
      left: cursor.x + 'px',
      top: cursor.y + 'px',
      backgroundColor: cursor.color,
    }}>
      {cursor.username}
    </div>
  );
}

export default CursorTracker;