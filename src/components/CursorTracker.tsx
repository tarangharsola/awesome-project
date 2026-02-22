{"import React from 'react';
import { useState, useEffect } from 'react';

interface CursorTrackerProps {
  userId: string;
  cursorPosition: number;
  color: string;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ userId, cursorPosition, color }) => {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPositionState, setCursorPositionState] = useState(cursorPosition);

  useEffect(() => {
    setCursorPositionState(cursorPosition);
  }, [cursorPosition]);

  return (
    <div style={{
      position: 'absolute',
      left: cursorPositionState + 'px',
      top: '10px',
      width: '2px',
      height: '10px',
      backgroundColor: color,
      opacity: cursorVisible ? 1 : 0,
    }} />
  );
}

export default CursorTracker;