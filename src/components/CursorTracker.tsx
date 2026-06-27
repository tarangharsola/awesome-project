{"import React from 'react';
import { useState, useEffect } from 'react';

function CursorTracker({ users, cursorPositions }) {
  const [cursorPosition, setCursorPosition] = useState({});

  useEffect(() => {
    const cursorPosition = cursorPositions[users[0].id];
    if (cursorPosition) {
      setCursorPosition(cursorPosition);
    }
  }, [users, cursorPositions]);

  return (
    <div style={{ position: 'absolute', top: cursorPosition.top, left: cursorPosition.left, backgroundColor: users[0].color, width: 2, height: 2 }} />
  );
}
export default CursorTracker;