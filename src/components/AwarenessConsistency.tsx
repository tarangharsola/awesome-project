{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const AwarenessConsistency = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = { reconnect: true, timeout: 10000 };

    const ws = new WebSocket(wsUrl, wsOptions);
    setWs(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'users') {
        setUsers(message.users);
      } else if (message.type === 'cursorPositions') {
        setCursorPositions(message.cursorPositions);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Awareness Consistency</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <ul>
        {Object.keys(cursorPositions).map((userId) => (
          <li key={userId}>{userId}: {cursorPositions[userId]}</li>
        ))}
      </ul>
    </div>
  );
};

export default AwarenessConsistency;