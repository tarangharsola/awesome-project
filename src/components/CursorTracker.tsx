{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: string;
}

const CursorTracker: React.FC<Props> = ({ cursor, user }) => {
  const { color } = useCursor(user);
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