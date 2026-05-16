{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string }
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ cursor, user }) => {
  const { x, y } = cursor;
  const { id, name, color } = user;

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor: color,
      width: 5,
      height: 5,
      borderRadius: '50%',
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;