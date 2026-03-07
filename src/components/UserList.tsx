{"import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WebSocket from './WebSocket';

const UserList = () => {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    WebSocket.connect(roomId);
    return () => WebSocket.disconnect();
  }, [roomId]);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;