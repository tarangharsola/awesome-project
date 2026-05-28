{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const CursorTracker = () => {
  const { cursors, send } = useWebSocket();
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPositions(cursors);
    }, 100);
    return () => clearInterval(interval);
  }, [cursors]);

  const handleMouseMove = (event) => {
    send({ type: 'cursor', payload: event.clientX, y: event.clientY });
  };

  return (
    <div className="cursor-tracker" onMouseMove={handleMouseMove}>
      {Object.keys(cursorPositions).map((id) => (
        <div key={id} style={{
          left: cursorPositions[id].x,
          top: cursorPositions[id].y,
          backgroundColor: cursorPositions[id].color,
          width: 2,
          height: 2,
        }} />
      ))}
    </div>
  );
};

export default CursorTracker;