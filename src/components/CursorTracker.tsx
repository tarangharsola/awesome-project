import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  userId: string;
  cursorPosition: [number, number];
}

const CursorTracker: React.FC<Props> = ({ userId, cursorPosition }) => {
  const { cursorColor } = useCursor(userId);
  return (
    <div style={{
      position: 'absolute',
      top: cursorPosition[1],
      left: cursorPosition[0],
      width: 2,
      height: 20,
      backgroundColor: cursorColor,
    }} />
  );
};

export default CursorTracker;