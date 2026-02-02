import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

const CursorTracker = () => {
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const cursor = JSON.parse(event.data);
      setCursors((prevCursors) => ({ ...prevCursors, [cursor.id]: cursor }));
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {Object.keys(cursors).map((id) => (
        <div key={id}>
          <span style={{ color: cursors[id].color }}>{cursors[id].username}</span>
          <span> at line {cursors[id].line}, column {cursors[id].ch}</span>
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;