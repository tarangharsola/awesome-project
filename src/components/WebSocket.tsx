{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ ws, users }) {
  const [wsState, setWsState] = useState('disconnected');

  useEffect(() => {
    if (ws) {
      setWsState('connected');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'users') {
          setUsers(data.users);
        } else if (data.type === 'editor') {
          setEditor(data.editor);
        }
      };
      return () => {
        ws.close();
      };
    }
  }, [ws]);

  return (
    <div>
      <span>Connection Status: {wsState}</span>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} ({user.color})</li>
        ))}
      </ul>
    </div>
  );
}

export default WebSocket;