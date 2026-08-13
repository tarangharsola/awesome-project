{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  userId: string;
  cursorPosition: [number, number];
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ userId, cursorPosition }) => {
  const { cursorColor } = useCursor(userId);
  return (
    <div style={{
      position: 'absolute',
      top: cursorPosition[1],
      left: cursorPosition[0],
      backgroundColor: cursorColor,
      width: 5,
      height: 5,
      borderRadius: '50%',
    }} />
  );
};

export default CursorTracker;