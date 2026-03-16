{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  username: string;
  color: string;
}

const CursorTracker: React.FC<Props> = ({ cursor, username, color }) => {
  const { x, y } = cursor;
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 2,
      height: 10,
      backgroundColor: color,
      zIndex: 1
    }}/>
  );
}

export default CursorTracker;