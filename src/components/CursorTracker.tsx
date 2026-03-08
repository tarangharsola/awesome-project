{"import React from 'react';
import { useState, useEffect } from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursorPosition: number;
  onChangeCursorPosition: (newCursorPosition: number) => void;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ cursorPosition, onChangeCursorPosition }) => {
  const [cursorPositionState, setCursorPositionState] = useState(cursorPosition);

  useEffect(() => {
    onChangeCursorPosition(cursorPositionState);
  }, [cursorPositionState, onChangeCursorPosition]);

  const handleCursorPositionChange = (newCursorPosition: number) => {
    setCursorPositionState(newCursorPosition);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: cursorPositionState,
        width: 2,
        height: '100%',
        backgroundColor: 'red',
      }}
    />
  );
};

export default CursorTracker;