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
      width: 2,
      height: 10,
      backgroundColor: user.color
    }}>
      {user.name}
    </div>
  );
}

export default CursorTracker;