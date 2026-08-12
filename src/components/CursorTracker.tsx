{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string; }
}

const CursorTracker = ({ cursor, user }: CursorTrackerProps) => {
  const { x, y } = cursor;
  const { id, name, color } = user;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: 10,
        height: 10,
        backgroundColor: color,
        borderRadius: '50%',
        zIndex: 1,
      }}
    />
  );
}

export default CursorTracker;