{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursorPosition: number;
  userName: string;
  userColor: string;
}

const CursorTracker = ({ cursorPosition, userName, userColor }: CursorTrackerProps) => {
  const { cursorRef } = useCursor(cursorPosition);
  return (
    <div ref={cursorRef} style={{
      position: 'absolute',
      left: cursorPosition,
      top: 0,
      width: 2,
      height: 20,
      backgroundColor: userColor,
      zIndex: 1
    }} />
  );
};

export default CursorTracker;