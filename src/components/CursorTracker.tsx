{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
}

const CursorTracker: React.FC<Props> = ({ cursor }) => {
  const { color, name } = useCursor(cursor);
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      backgroundColor: color,
      width: 2,
      height: 2,
      borderRadius: '50%',
    }}>
      {name}
    </div>
  );
}

export default CursorTracker;