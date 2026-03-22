{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  userId: string
}

const CursorTracker: React.FC<Props> = ({ cursor, userId }) => {
  const { color } = useCursor(userId);
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: 2,
      height: 10,
      backgroundColor: color
    }} />
  );
}

export default CursorTracker;