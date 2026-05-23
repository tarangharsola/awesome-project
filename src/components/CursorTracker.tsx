{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  cursor: { x: number; y: number; }
}

const CursorTracker: React.FC<Props> = ({ cursor }) => {
  const { x, y } = useCursor(cursor);
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 2,
      height: 2,
      backgroundColor: 'red',
    }} />
  );
}

export default CursorTracker;