{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { name: string; color: string }
}

const CursorTracker: React.FC<Props> = ({ cursor, user }) => {
  const { x, y } = cursor;
  const { name, color } = user;
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
      {name}
    </div>
  );
}

export default CursorTracker;