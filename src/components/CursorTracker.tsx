{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  userId: string;
  cursorPosition: number;
  color: string;
}

const CursorTracker: React.FC<Props> = ({ userId, cursorPosition, color }) => {
  const { cursor } = useCursor(userId);
  return (
    <div style={{
      position: 'absolute',
      left: cursorPosition,
      top: 0,
      width: 2,
      height: 20,
      backgroundColor: color,
    }} />
  );
}

export default CursorTracker;