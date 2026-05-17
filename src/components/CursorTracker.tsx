{"import React from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const { cursorPosition, cursorColor } = useCursor();

  return (
    <div style={{
      position: "absolute",
      top: cursorPosition.y,
      left: cursorPosition.x,
      width: "5px",
      height: "5px",
      backgroundColor: cursorColor,
      borderRadius: "5px",
    }} />
  );
};

export default CursorTracker;