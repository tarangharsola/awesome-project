{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  user: string;
  color: string;
}

const CursorTracker = ({ cursor, user, color }: Props) => {
  const { x, y } = useCursor(cursor);
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 2,
      height: 20,
      backgroundColor: color,
    }} />
  );
}

export default CursorTracker;