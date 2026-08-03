{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
}

const CursorTracker: React.FC<Props> = ({ cursor }) => {
  const { color, name } = useCursor();
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: 2,
      height: 2,
      backgroundColor: color,
      borderRadius: '50%',
    }} />
  );
}

export default CursorTracker;