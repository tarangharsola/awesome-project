{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string }
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ cursor, user }) => {
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      backgroundColor: user.color,
      width: 10,
      height: 10,
      borderRadius: '50%',
    }}>
      {user.name}
    </div>
  );
}

export default CursorTracker;