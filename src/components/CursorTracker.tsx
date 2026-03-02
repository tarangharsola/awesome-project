{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { id: string; x: number; y: number; }
}

const CursorTracker: React.FC<Props> = ({ cursor }) => {
  const { x, y } = useCursor(cursor.id);
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 2,
      height: 10,
      backgroundColor: 'red',
    }} />
  );
}

export default CursorTracker;