{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  username: string;
  color: string;
}

const CursorTracker = ({ cursor, username, color }: CursorTrackerProps) => {
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: 2,
      height: 10,
      backgroundColor: color,
      zIndex: 1
    }}>
      {username}
    </div>
  );
}

export default CursorTracker;