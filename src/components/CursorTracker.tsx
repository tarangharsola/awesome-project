{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
}

const CursorTracker = ({ cursor }: Props) => {
  const { color } = useCursor();
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: 2,
      height: 2,
      backgroundColor: color,
    }} />
  );
}

export default CursorTracker;