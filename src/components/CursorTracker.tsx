{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursorPosition: number;
  name: string;
  color: string;
}

const CursorTracker = ({ cursorPosition, name, color }: Props) => {
  const { cursorRef } = useCursor();
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: cursorPosition,
      height: 2,
      backgroundColor: color,
      zIndex: 1,
    }} ref={cursorRef} />
  );
};

export default CursorTracker;