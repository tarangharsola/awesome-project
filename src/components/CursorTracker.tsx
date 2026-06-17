{"import React from 'react';
import { useCursor } from '../utils/useCursor';

interface Props {
  userId: string;
  cursorPosition: number;
  color: string;
}

const CursorTracker: React.FC<Props> = ({ userId, cursorPosition, color }) => {
  const { cursors } = useCursor();
  const cursor = cursors[userId];

  if (!cursor) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: cursorPosition,
        left: cursorPosition,
        width: 2,
        height: 20,
        backgroundColor: color,
      }}
    />
  );
}

export default CursorTracker;