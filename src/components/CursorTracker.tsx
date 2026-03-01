{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  userId: string;
  color: string;
}

const CursorTracker: React.FC<Props> = ({ cursor, userId, color }) => {
  const { x, y } = cursor;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 2,
        height: 20,
        backgroundColor: color,
      }}
    />
  );
}

export default CursorTracker;