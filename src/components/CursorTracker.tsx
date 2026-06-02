{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const CursorTracker = () => {
  const { socket, connected } = useWebSocket();
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    if (connected) {
      socket.on('cursorUpdate', (cursor) => {
        setCursors((prevCursors) => ({ ...prevCursors, [cursor.userId]: cursor }));
      });
    }
    return () => {
      socket.off('cursorUpdate');
    };
  }, [connected, socket]);

  return (
    <div>
      {Object.keys(cursors).map((userId) => (
        <div key={userId} style={{
          position: 'absolute',
          top: cursors[userId].y,
          left: cursors[userId].x,
          backgroundColor: cursors[userId].color,
          width: 2,
          height: 2,
        }}>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;