{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  userId: string;
  cursorPosition: [number, number];
}

const CursorTracker = ({ userId, cursorPosition }: Props) => {
  const { cursorColor } = useCursor(userId);
  return (
    <div style={{
      position: 'absolute',
      left: cursorPosition[0],
      top: cursorPosition[1],
      width: 2,
      height: 20,
      backgroundColor: cursorColor,
    }} />
  );
}

export default CursorTracker;