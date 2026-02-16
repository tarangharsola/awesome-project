{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const CursorTracker = () => {
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursor') {
        setCursors(data.cursors);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {cursors.map((cursor, index) => (
        <div key={index}>{cursor.name} ({cursor.line}, {cursor.column})</div>
      ))}
    </div>
  );
};

export default CursorTracker;