{"import React from 'react';
import { useCursor } from './useCursor';

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
      width: 10,
      height: 10,
      backgroundColor: color,
      borderRadius: '50%',
    }}>
      <span style={{
        position: 'absolute',
        left: -10,
        top: -15,
        fontSize: 12,
        color: 'white',
      }}>{name}</span>
    </div>
  );
}

export default CursorTracker;