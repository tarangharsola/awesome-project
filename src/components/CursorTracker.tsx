{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string }
}

const CursorTracker = ({ cursor, user }) => {
  const { x, y } = cursor;
  const { id, name, color } = user;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 2,
        height: 10,
        backgroundColor: color,
        zIndex: 1
      }}
    />
  );
}

export default CursorTracker;