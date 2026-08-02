{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: { name: string; color: string }
}

const CursorTracker: React.FC<Props> = ({ cursor, user }) => {
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: 2,
      height: 10,
      backgroundColor: user.color,
      borderRadius: '50%' }} />
  );
}

export default CursorTracker;