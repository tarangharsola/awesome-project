{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocket = ({ cursorPositions }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursorPosition') {
        console.log(data.cursorPositions);
      } else if (data.type === 'users') {
        console.log(data.users);
      }
    };
    return () => ws.close();
  }, []);

  const handleCursorChange = (line, ch) => {
    ws.send(JSON.stringify({ type: 'cursorPosition', cursorPositions: { [line]: ch } }));
  };

  return (
    <div>
      <h1>Cursor Positions:</h1>
      <ul>
        {Object.keys(cursorPositions).map((line) => (
          <li key={line}>{line}: {cursorPositions[line]}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocket;