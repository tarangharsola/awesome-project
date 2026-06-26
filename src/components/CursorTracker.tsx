{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
}

const CursorTracker = ({ cursor }: Props) => {
  const { color, name } = useCursor();
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: 2,
      height: 20,
      backgroundColor: color,
      zIndex: 1
    }}/>
  );
}

export default CursorTracker;