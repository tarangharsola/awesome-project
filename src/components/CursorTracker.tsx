{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { id: string; name: string; color: string; }
}

const CursorTracker = ({ cursor, user }) => {
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
      border: '2px solid #fff',
    }}>
      <span style={{
        position: 'absolute',
        left: x + 12,
        top: y - 10,
        fontSize: 12,
        color: '#fff',
      }}>{name}</span>
    </div>
  );
}

export default CursorTracker;