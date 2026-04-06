{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  user: { name: string; color: string }
}

const CursorTracker = ({ cursor, user }: CursorTrackerProps) => {
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      backgroundColor: user.color,
      width: 10,
      height: 10
    }}>
      {user.name}
    </div>
  );
}

export default CursorTracker;