{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string }
}

const CursorTracker = ({ cursor, user }: CursorTrackerProps) => {
  const { x, y } = cursor;
  const { id, name, color } = user;
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 10,
      height: 10,
      backgroundColor: color,
      borderRadius: '50%',
      zIndex: 1
    }}>
      <span style={{
        position: 'absolute',
        left: x + 12,
        top: y - 10,
        fontSize: 12,
        color: 'white'
      }}>{name}</span>
    </div>
  );
}

export default CursorTracker;