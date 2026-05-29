{"import React from 'react';
import { useCursor } from '../useCursor';

interface Props {
  cursor: { id: string; name: string; color: string; x: number; y: number };
}

const CursorTracker = ({ cursor }: Props) => {
  return (
    <div className="cursor" style={{
      backgroundColor: cursor.color,
      color: 'white',
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      zIndex: 1000,
    }}>
      {cursor.name}
    </div>
  );
};

export default CursorTracker;