{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  name: string;
  color: string;
}

const CursorTracker = ({ cursor, name, color }: Props) => {
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: '10px',
      height: '10px',
      backgroundColor: color,
      borderRadius: '50%',
      zIndex: 1,
    }}>
      {name}
    </div>
  );
};

export default CursorTracker;