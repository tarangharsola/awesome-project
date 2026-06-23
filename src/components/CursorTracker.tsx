{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  userId: string;
  cursorPosition: number;
}

const CursorTracker = ({ userId, cursorPosition }: Props) => {
  const { cursorColor } = useCursor(userId);
  return (
    <div style={{
      position: 'absolute',
      left: cursorPosition,
      top: 0,
      width: 2,
      height: '100%',
      backgroundColor: cursorColor,
    }} />
  );
}

export default CursorTracker;