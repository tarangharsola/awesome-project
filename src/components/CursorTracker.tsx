{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
}

const CursorTracker = ({ cursor }: Props) => {
  const { x, y } = cursor;
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
};

export default CursorTracker;