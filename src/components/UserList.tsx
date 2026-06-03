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
    return () => ws.close();
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{ backgroundColor: user.color, padding: '10px' }}>{user.name}</div>
      ))}
    </div>
  );
}

export default UserList;