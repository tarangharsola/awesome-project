{"import React from 'react';
import { useCursor } from './useCursor';

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
      height: 20,
      backgroundColor: color,
      borderRadius: 2,
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;