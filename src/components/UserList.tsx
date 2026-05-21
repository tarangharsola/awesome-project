{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function UserList({ users }) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;