{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { name: string; color: string }
}

const CursorTracker = ({ cursor, user }) => {
  const { x, y } = cursor;
  const { name, color } = user;
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      backgroundColor: color,
      width: 5,
      height: 5
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;