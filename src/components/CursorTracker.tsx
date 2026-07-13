{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  userId: string;
  cursorPosition: number;
}

const CursorTracker: React.FC<Props> = ({ userId, cursorPosition }) => {
  const { cursorColor } = useCursor(userId);
  return (
    <div style={{
      position: 'absolute',
      top: cursorPosition,
      left: 0,
      width: 2,
      height: '100%',
      backgroundColor: cursorColor,
    }} />
  );
}

export default CursorTracker;