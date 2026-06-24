{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string; }
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
        width: 10,
        height: 10,
        backgroundColor: color,
        borderRadius: '50%',
      }}
    />
  );
}

export default CursorTracker;