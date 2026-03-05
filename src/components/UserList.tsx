{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function UserList({ users }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUserList(data.users);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {userList.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
}

export default UserList;